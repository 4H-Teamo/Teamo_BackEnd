import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { RequestWithCookies } from 'src/shared/interfaces/auth.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req: RequestWithCookies) => {
        return req.cookies.refreshToken ?? null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  validate(payload: { userId: string }) {
    return {
      userId: payload.userId,
    };
  }
}
