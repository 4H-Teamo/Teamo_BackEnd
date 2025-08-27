import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsIndexDto } from './dto/posts-index.dto';
import { PostCreateDto } from './dto/post-create.dto';
import { PostIdDto } from './dto/post-id.dto';
import { PostsUpdateDto } from './dto/posts-update.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from '../shared/interfaces/auth.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  index(@Query() query: PostsIndexDto) {
    return this.postsService.index(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  indexById(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.postsService.indexById(user.userId);
  }

  @Get(':postId')
  show(@Param() param: PostIdDto) {
    return this.postsService.show(param.postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: RequestWithUser, @Body() body: PostCreateDto) {
    const user = req.user;
    return this.postsService.create(body, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':postId')
  update(
    @Req() req: RequestWithUser,
    @Param() param: PostIdDto,
    @Body() body: PostsUpdateDto,
  ) {
    const user = req.user;
    return this.postsService.update(param.postId, user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  destroy(@Req() req: RequestWithUser, @Param() param: PostIdDto) {
    const user = req.user;
    return this.postsService.destroy(param.postId, user.userId);
  }
}
