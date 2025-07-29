import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StringValidationMessage } from '../../shared/validators/messages/validation.messages';

export class CommentsCreateDto {
  @ApiProperty({
    example: '울산 거주하는데, 온라인 참여 가능할까요?',
    description: '댓글 내용',
  })
  @IsString({ message: StringValidationMessage })
  content: string;
}
