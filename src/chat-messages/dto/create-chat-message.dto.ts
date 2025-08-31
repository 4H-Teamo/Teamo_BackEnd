import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsUUID } from 'class-validator';
import {
  MongoIdValidationMessage,
  StringValidationMessage,
  UuidValidationMessage,
} from 'src/shared/validators/messages/validation.messages';

export class ChatMessageCreateDto {
  @ApiProperty({
    example: '68b29e7224e1a5086dc34131',
    description: '채팅방 아이디',
  })
  @IsMongoId({ message: MongoIdValidationMessage })
  roomId: string;

  @ApiProperty({
    example: '안녕하세요, 팀원 모집 중입니다!',
    description: '메세지 내용',
  })
  @IsString({ message: StringValidationMessage })
  content: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: '메세지 작성자 아이디',
  })
  @IsUUID(4, { message: UuidValidationMessage })
  userId: string;
}
