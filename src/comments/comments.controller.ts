import { Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PostsIdDto } from '../posts/dto/posts-id.dto';
import { CommentsCreateDto } from './dto/comments-create.dto';
import { CommentsIdDto } from './dto/comments-id.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('posts/:postId/comments')
  create(@Param() param: PostsIdDto, @Body() body: CommentsCreateDto) {
    const userId = 'cc7a79ce-3b56-4022-b098-09be5d2f482b'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.commentsService.create(param.postId, userId, body);
  }

  @Patch('comments/:commentId')
  update(@Param() param: CommentsIdDto, @Body() body: CommentsCreateDto) {
    const userId = 'cc7a79ce-3b56-4022-b098-09be5d2f482b'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.commentsService.update(userId, param.commentId, body);
  }

  @Delete('comments/:commentId')
  destroy(@Param() param: CommentsIdDto) {
    const userId = 'cc7a79ce-3b56-4022-b098-09be5d2f482b'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.commentsService.destroy(userId, param.commentId);
  }
}
