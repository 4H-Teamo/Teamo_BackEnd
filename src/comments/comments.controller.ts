import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PostsIdDto } from '../posts/dto/posts-id.dto';
import { CommentsCreateDto } from './dto/comments-create.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('posts/:postId/comments')
  create(@Param() param: PostsIdDto, @Body() body: CommentsCreateDto) {
    const userId = 'cc7a79ce-3b56-4022-b098-09be5d2f482b'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.commentsService.create(param.postId, userId, body);
  }
}
