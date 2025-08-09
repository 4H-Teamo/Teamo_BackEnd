import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma-postgres';
// TODO: prisma-postgres로 임의 조치, mongo에 대한 것은 추후 개발 및 반영.

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2000':
        throw new BadRequestException('입력된 값이 너무 깁니다.');

      case 'P2001':
        throw new NotFoundException('조건에 맞는 데이터를 찾을 수 없습니다.');

      case 'P2002': {
        const target =
          (error.meta?.target as string[])?.join(', ') ?? '해당 필드';
        throw new ConflictException(`${target}는(은) 이미 존재합니다.`);
      }

      case 'P2003': {
        const field =
          typeof error.meta?.field_name === 'string'
            ? error.meta.field_name
            : '알 수 없는 필드';

        throw new BadRequestException(`존재하지 않는 참조입니다: ${field}`);
      }

      case 'P2023': {
        throw new BadRequestException(
          '요청한 데이터 간의 관계가 올바르지 않거나, 존재하지 않는 ID를 참조했습니다.',
        );
      }

      case 'P2025':
        throw new NotFoundException('대상 데이터를 찾을 수 없습니다.');

      case 'P2005':
        throw new BadRequestException('입력된 데이터 형식이 잘못되었습니다.');

      case 'P2011':
        throw new BadRequestException('필수 필드가 누락되었습니다.');

      case 'P2013':
        throw new BadRequestException('쿼리 매개변수가 부족합니다.');

      default:
        console.error('[Prisma Error]', error);
        throw new InternalServerErrorException(
          '데이터베이스 처리 중 오류가 발생했습니다.',
        );
    }
  }

  throw new InternalServerErrorException(
    '알 수 없는 서버 오류가 발생했습니다.',
  );
}
