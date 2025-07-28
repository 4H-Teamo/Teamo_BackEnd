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
  MaxIntValidationMessage,
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
  @IsInt({ each: true, message: IntArrayValidationMessage })
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastStackId, { each: true, message: MaxIntValidationMessage })
  stacks: number[];

  @IsArray({ message: IntArrayValidationMessage })
  @ArrayNotEmpty({ message: ArrayEmptyValidationMessage })
  @IsInt({ each: true, message: IntArrayValidationMessage })
  @Min(1, { each: true, message: PositiveIntValidationMessage })
  @Max(LastPositionId, { each: true, message: MaxIntValidationMessage })
  positions: number[];
}
