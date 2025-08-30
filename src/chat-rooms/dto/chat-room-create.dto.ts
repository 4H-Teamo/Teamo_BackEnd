import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsUUID,
} from 'class-validator';
import {
  ArrayEmptyValidationMessage,
  ArrayMaxSizeValidationMessage,
  ArrayMinSizeValidationMessage,
  StringArrayValidationMessage,
  UuidValidationMessage,
} from 'src/shared/validators/messages/validation.messages';

export class ChatRoomCreateDto {
  @ApiProperty({
    example: [
      '01f9b9a2-6e26-4d42-b874-9dde92e8d2aae',
      '1a2b3c4d-5e6f-4789-abcd-ef0123456789',
    ],
    description: '유저ID(UUID)가 담긴 배열',
  })
  @IsArray({ message: StringArrayValidationMessage })
  @IsUUID(4, { each: true, message: UuidValidationMessage })
  @ArrayNotEmpty({ message: ArrayEmptyValidationMessage })
  @ArrayMinSize(2, { message: ArrayMinSizeValidationMessage })
  @ArrayMaxSize(2, { message: ArrayMaxSizeValidationMessage })
  participants: string[];
}
