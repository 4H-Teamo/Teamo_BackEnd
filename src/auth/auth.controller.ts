import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  async kakaoLogin(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    const userInfo = await this.authService.getKakaoUserInfo(accessToken);

    const user = await this.authService.kakaoLogin(userInfo, res);

    return {
      user: user.userData,
      token: user.token,
    };
  }
}
