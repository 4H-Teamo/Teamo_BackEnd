import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import {
  IntValidationMessage,
  PositiveIntValidationMessage,
} from '../../shared/validators/messages/validation.messages';
import { ApiProperty } from '@nestjs/swagger';

export class PostsIndexDto {
  @ApiProperty({ example: 1, description: '페이지' })
  @IsOptional()
  @Type(() => Number) // 문자열 → 숫자 변환
  @IsInt({
    message: IntValidationMessage,
  })
  @IsPositive({
    message: PositiveIntValidationMessage,
  })
  page?: number = 1;

  @ApiProperty({ example: 10, description: '한 페이지당 받을 개수' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: IntValidationMessage,
  })
  @IsPositive({
    message: PositiveIntValidationMessage,
  })
  limit?: number = 10;
}
