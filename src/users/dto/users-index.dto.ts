import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import {
  IntValidationMessage,
  PositiveIntValidationMessage,
} from '../../shared/validators/messages/validation.messages';

export class UsersIndexDto {
  @IsOptional()
  @Type(() => Number)
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
