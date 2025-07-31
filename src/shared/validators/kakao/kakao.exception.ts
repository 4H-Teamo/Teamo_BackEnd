import {
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

interface KakaoErrorResponse {
  error: string;
  error_description: string;
  error_code?: string;
  code?: number;
  msg?: string;
}

function isKakaoErrorResponse(arg: any): arg is KakaoErrorResponse {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    typeof (arg as KakaoErrorResponse).error === 'string' &&
    typeof (arg as KakaoErrorResponse).error_description === 'string'
  );
}

export function handleKakaoApiError(error: unknown): never {
  if (isKakaoErrorResponse(error)) {
    const errorCode = error.error_code || error.code;

    switch (errorCode) {
      case 'KOE320':
        throw new BadRequestException(
          `인증 코드가 유효하지 않습니다. 다시 시도해주세요.`,
        );
      case 'KOE006':
      case -401:
        throw new UnauthorizedException(
          `인증 정보가 유효하지 않습니다. accessToken을 확인해주세요.`,
        );
      case 'KOE101':
        throw new BadRequestException(
          `앱 설정이 올바르지 않습니다. client_id 또는 redirect_uri를 확인해주세요`,
        );
      default:
        console.error('[Kakao API Error]', error);
        throw new InternalServerErrorException(
          `카카오 API 처리 중 오류가 발생했습니다.`,
        );
    }
  }

  throw new InternalServerErrorException(
    '알 수 없는 서버 오류가 발생했습니다.',
  );
}
