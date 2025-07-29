import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UuidValidationMessage } from '../../shared/validators/messages/validation.messages';

export class PostsIdDto {
  @ApiProperty({
    example: 'ABCDE-... (게시글 uuid)',
    description: '게시글 아이디',
  })
  @IsUUID(4, { message: UuidValidationMessage })
  postId: string;
}
