import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

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

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.tokenService.deleteRefreshToken(res);
    return {
      message: '로그아웃 처리되었습니다.',
    };
  }
}
