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
      'f8b1c4e6-d9a2-4b3c-8e7d-1a0f9b2c3d4e',
      'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
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
