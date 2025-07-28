import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import {
  IntValidationMessage,
  PositiveIntValidationMessage,
} from '../../shared/validators/messages/validation.message';

export class PostsIndexDto {
  @IsOptional()
  @Type(() => Number) // 문자열 → 숫자 변환
  @IsInt({
    message: IntValidationMessage,
  })
  @IsPositive({
    message: PositiveIntValidationMessage,
  })
  page?: number = 1;

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
