import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { StringValidationMessage } from 'src/shared/validators/messages/validation.messages';

export class CreateNoticeDto {
  @ApiProperty({
    example: 'cc7a79ce-3b56-4022-b098-09be5d2f482b',
    description: '알림을 받는 유저 아이디',
  })
  @IsString({ message: StringValidationMessage })
  userId: string;

  @ApiProperty({
    example: '새로운 댓글이 달렸습니다.',
    description: '알림 내용',
  })
  @IsString({ message: StringValidationMessage })
  content: string;
}
