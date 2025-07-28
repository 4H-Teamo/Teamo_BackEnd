import {
  IsString,
  IsInt,
  IsArray,
  IsDateString,
  ArrayNotEmpty,
  IsPositive,
  Min,
  Max,
} from 'class-validator';
import {
  ArrayEmptyValidationMessage,
  DateValidationMessage,
  IntArrayValidationMessage,
  IntValidationMessage,
  PositiveIntValidationMessage,
  StringValidationMessage,
  WorkModeValidationMessage,
} from '../../shared/validators/messages/validation.messages';
import {
  LastPositionId,
  LastStackId,
} from '../../shared/validators/values/validation.values';

export class PostsCreateDto {
  @IsString({ message: StringValidationMessage })
  title: string;

  @IsString({ message: StringValidationMessage })
  content: string;

  @IsInt({ message: IntValidationMessage })
  @Min(1, {
    message: WorkModeValidationMessage,
  })
  @Max(3, {
    message: WorkModeValidationMessage,
  })
  workMode: number;

  @IsDateString({}, { message: DateValidationMessage })
  endDate: string;

  @IsInt({ message: IntValidationMessage })
  @IsPositive({
    message: PositiveIntValidationMessage,
  })
  capacity: number;

  @IsArray({ message: IntArrayValidationMessage })
  @ArrayNotEmpty({ message: ArrayEmptyValidationMessage })
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(LastStackId, { each: true })
  stacks: number[];

  @IsArray({ message: IntArrayValidationMessage })
  @ArrayNotEmpty({ message: ArrayEmptyValidationMessage })
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(LastPositionId, { each: true })
  positions: number[];
}
