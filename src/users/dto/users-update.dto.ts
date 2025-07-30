import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import {
  ArrayEmptyValidationMessage,
  BooleanValidationMessage,
  IntArrayValidationMessage,
  IntValidationMessage,
  MaxIntValidationMessage,
  PositiveIntValidationMessage,
  StringValidationMessage,
  UrlValidationMessage,
  WorkModeValidationMessage,
} from 'src/shared/validators/messages/validation.messages';
import {
  LastPositionId,
  LastStackId,
} from 'src/shared/validators/values/validation.values';

export class UserUpdateDto {
  @IsOptional()
  @IsString({ message: StringValidationMessage })
  nickname?: string;

  @IsOptional()
  @IsString({ message: StringValidationMessage })
  description?: string;

  @IsOptional()
  @IsString({ message: StringValidationMessage })
  location?: string;

  @IsOptional()
  @IsString({ message: StringValidationMessage })
  //@IsUrl() // 이미지 저장 방식 결정 후 수정
  image?: string;

  @IsOptional()
  @IsString({ message: StringValidationMessage })
  @IsUrl({}, { message: UrlValidationMessage })
  github?: string;

  @IsOptional()
  @IsInt({ message: IntValidationMessage })
  @Min(1, {
    message: WorkModeValidationMessage,
  })
  @Max(3, {
    message: WorkModeValidationMessage,
  })
  @Type(() => Number)
  workMode?: number;

  @IsOptional()
  @IsBoolean({ message: BooleanValidationMessage })
  beginner?: boolean;

  @IsOptional()
  @IsBoolean({ message: BooleanValidationMessage })
  isPublic?: boolean;

  @IsOptional()
  @IsArray({ message: IntArrayValidationMessage })
  @ArrayNotEmpty({ message: ArrayEmptyValidationMessage })
  @IsInt({ each: true, message: ArrayEmptyValidationMessage })
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastStackId, { each: true, message: MaxIntValidationMessage })
  @Type(() => Number)
  stacks?: number[];

  @IsOptional()
  @IsInt({ message: IntValidationMessage })
  @Type(() => Number)
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastPositionId, { each: true, message: MaxIntValidationMessage })
  positionId?: number;
}
