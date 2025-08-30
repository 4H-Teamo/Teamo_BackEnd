import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { MongoIdValidationMessage } from 'src/shared/validators/messages/validation.messages';

export class ChatRoomIdDto {
  @ApiProperty({
    example: '68b29e7224e1a5086dc34131',
    description: '채팅방 아이디',
  })
  @IsMongoId({ message: MongoIdValidationMessage })
  chatRoomId: string;
}
