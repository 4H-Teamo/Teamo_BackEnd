import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import {
  IntValidationMessage,
  StringValidationMessage,
} from 'src/shared/validators/messages/validation.messages';

export class UserCreateDto {
  @IsString({ message: StringValidationMessage })
  kakaoId: string;

  @IsString({ message: StringValidationMessage })
  nickname: string;

  @ApiProperty({
    example: 1,
    description: '소셜 로그인 제공자 (1: 카카오)',
  })
  @IsInt({ message: IntValidationMessage })
  provider: number;
}
