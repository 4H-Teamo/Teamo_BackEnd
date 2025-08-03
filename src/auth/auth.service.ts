import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from 'src/shared/validators/prisma/prisma.exception';
import { ConfigService } from '@nestjs/config';
import {
  handleKakaoApiError,
  isKakaoErrorResponse,
  KakaoApiException,
} from 'src/shared/validators/kakao/kakao.exception';
import { UsersService } from 'src/users/users.service';
import { User } from 'generated/prisma';
import {
  KakaoAccessToken,
  KakaoErrorResponse,
  KakaoUserInfo,
} from './interface/kakao.interfaces';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async show(externalId: string) {
    try {
      const showUser = await this.prisma.social.findUnique({
        where: {
          externalId,
        },
        include: {
          user: true,
        },
      });
      return showUser?.user;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async getKakaoAccessToken(code: string) {
    const KAKAO_RESTAPI_KEY =
      this.configService.get<string>('KAKAO_RESTAPI_KEY') || '';
    const KAKAO_REDIRECT_URI =
      this.configService.get<string>('KAKAO_REDIRECT_URI') || '';

    const config = {
      grant_type: 'authorization_code',
      client_id: KAKAO_RESTAPI_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      code,
    };

    const requestBody = new URLSearchParams(config).toString();
    const tokenUrl = `https://kauth.kakao.com/oauth/token`;
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: tokenHeaders,
        body: requestBody,
      });

      const data = (await response.json()) as
        | KakaoAccessToken
        | KakaoErrorResponse;

      if (isKakaoErrorResponse(data)) {
        throw new KakaoApiException(data);
      }

      return data.access_token;
    } catch (error) {
      handleKakaoApiError(error);
    }
  }

  async getKakaoUserInfo(accessToken: string) {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    const userInfoHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(userInfoUrl, {
        headers: userInfoHeaders,
      });

      const userInfo = (await response.json()) as
        | KakaoUserInfo
        | KakaoErrorResponse;

      if (isKakaoErrorResponse(userInfo)) {
        throw new KakaoApiException(userInfo);
      }

      return userInfo;
    } catch (error) {
      handleKakaoApiError(error);
    }
  }

  async kakaoLogin(userInfo: KakaoUserInfo, res: Response) {
    let user: User;
    const kakaoId = userInfo.id.toString();
    try {
      const existUser = await this.show(kakaoId);
      if (existUser) {
        user = existUser;
      } else {
        user = await this.usersService.create({
          nickname: userInfo.properties.nickname,
          kakaoId,
          provider: 1,
        });
      }

      const accessToken = this.getAccessToken(user);
      this.setRefreshToken(user, res);

      return {
        userData: user,
        token: accessToken,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  getAccessToken(user: User) {
    return this.jwtService.sign(
      {
        userId: user.userId,
        nickname: user.nickname,
      },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
        expiresIn: '5m',
      },
    );
  }

  setRefreshToken(user: User, res: Response) {
    const refreshToken = this.jwtService.sign(
      {
        userId: user.userId,
        nickname: user.nickname,
      },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
        expiresIn: '2w',
      },
    );

    const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('SECURE_MODE') === 'production',
      sameSite: 'strict',
      maxAge: twoWeeksInMs,
    });
  }
}
