import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UuidValidationMessage } from '../../shared/validators/messages/validation.messages';

export class CommentsIdDto {
  @ApiProperty({
    example: 'Comments Id (UUID)',
    description: 'uuid',
  })
  @IsUUID(4, { message: UuidValidationMessage })
  commentId: string;
}
