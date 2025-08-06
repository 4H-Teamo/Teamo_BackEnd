import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UuidValidationMessage } from '../../shared/validators/messages/validation.messages';

export class NoticeIdDto {
  @ApiProperty({
    example: 'ABCDE-... (알림 uuid)',
    description: '알림 아이디',
  })
  @IsUUID(4, { message: UuidValidationMessage })
  noticeId: string;
}
