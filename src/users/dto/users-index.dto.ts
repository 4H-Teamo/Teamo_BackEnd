import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import {
  IntValidationMessage,
  PositiveIntValidationMessage,
} from '../../shared/validators/messages/validation.messages';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UsersIndexDto {
  @ApiPropertyOptional({ example: 1, description: '페이지' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: IntValidationMessage,
  })
  @IsPositive({
    message: PositiveIntValidationMessage,
  })
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: '한 페이지당 받을 개수' })
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
