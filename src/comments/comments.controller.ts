import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PostIdDto } from '../posts/dto/post-id.dto';
import { CommentsCreateDto } from './dto/comments-create.dto';
import { CommentsIdDto } from './dto/comments-id.dto';
import { RequestWithUser } from '../shared/interfaces/auth.interface';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('posts/:postId/comments')
  create(
    @Req() req: RequestWithUser,
    @Param() param: PostIdDto,
    @Body() body: CommentsCreateDto,
  ) {
    const user = req.user;
    return this.commentsService.create(param.postId, user.userId, body);
  }

  @Patch('comments/:commentId')
  update(
    @Req() req: RequestWithUser,
    @Param() param: CommentsIdDto,
    @Body() body: CommentsCreateDto,
  ) {
    const user = req.user;
    return this.commentsService.update(user.userId, param.commentId, body);
  }

  @Delete('comments/:commentId')
  destroy(@Req() req: RequestWithUser, @Param() param: CommentsIdDto) {
    const user = req.user;
    return this.commentsService.destroy(user.userId, param.commentId);
  }
}
