import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  async kakaoLogin(@Query('code') code: string) {
    const accessToken = await this.authService.getKakaoAccessToken(code);
    const userInfo = await this.authService.getKakaoUserInfo(accessToken);

    const user = await this.authService.kakaoLogin(userInfo);

    return {
      user: user.userData,
      token: user.token,
    };
  }
}
