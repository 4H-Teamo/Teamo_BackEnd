import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PostsDestroyDto {
  @ApiProperty({
    example: 'ABCDE-... (게시글 uuid)',
    description: '게시글 아이디',
  })
  @IsUUID()
  postId: string;
}
