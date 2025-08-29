import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UuidValidationMessage } from '../../shared/validators/messages/validation.messages';

export class ChatRoomIdDto {
  @ApiProperty({
    example: 'ABCDE-... (채팅방 ID uuid)',
    description: '채팅방 아이디',
  })
  @IsUUID(4, { message: UuidValidationMessage })
  chatRoomId: string;
}
