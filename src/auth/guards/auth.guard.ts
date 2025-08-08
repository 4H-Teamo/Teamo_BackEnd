import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { TokenService } from '../token.service';
import { RequestWithCookies } from 'src/shared/interfaces/auth.interface';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithCookies>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('토큰이 존재하지 않습니다.');
      }

      const token = authHeader.split(' ')[1];
      const userPayload = this.tokenService.decodeAccessToken(token);
      request.user = {
        userId: userPayload.userId,
        nickname: userPayload.nickname,
      };

      return true;
    } catch (error) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof UnauthorizedException
      ) {
        const refreshToken = request.cookies.refreshToken;

        if (!refreshToken) {
          throw new UnauthorizedException('Refresh Token이 존재하지 않습니다.');
        }

        try {
          const newAccessToken =
            await this.tokenService.refreshAccessToken(refreshToken);
          response.setHeader('Authorization', `Bearer ${newAccessToken}`);

          const userPayload =
            this.tokenService.decodeAccessToken(newAccessToken);
          request.user = {
            userId: userPayload.userId,
            nickname: userPayload.nickname,
          };

          return true;
        } catch (refreshError) {
          console.error('RefreshToken 확인 중 에러 발생:', refreshError);
          throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
        }
      }

      throw new InternalServerErrorException(
        '인증 과정에서 알 수 없는 에러가 발생했습니다.',
      );
    }
  }
}
