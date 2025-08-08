import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

interface RefreshTokenPayload {
  userId: string;
}

interface AccessTokenPayload {
  userId: string;
  nickname: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  generateRefreshToken(userId: string, res: Response) {
    const payload = { userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: '2w',
    });

    const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('SECURE_MODE') === 'production',
      sameSite: 'strict',
      maxAge: twoWeeksInMs,
    });
  }

  generateAccessToken(userId: string, nickname: string): string {
    const payload = { userId, nickname };
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: '3m',
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded: RefreshTokenPayload = this.jwtService.verify(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_SECRET',
          ),
        },
      );

      const userId = decoded.userId;

      const user = await this.usersService.show(userId);
      if (!user) {
        throw new UnauthorizedException('일치하는 유저를 찾을 수 없습니다.');
      }

      return this.generateAccessToken(user.userId, user.nickname);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
    }
  }

  decodeAccessToken(accessToken: string): { userId: string; nickname: string } {
    const decoded: AccessTokenPayload = this.jwtService.verify(accessToken, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
    });

    if (!decoded || !decoded.userId || !decoded.nickname) {
      throw new UnauthorizedException('Access Token이 유효하지 않습니다.');
    }
    return decoded;
  }
}
