import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsIndexDto } from './dto/posts-index.dto';
import { PostCreateDto } from './dto/post-create.dto';
import { PostIdDto } from './dto/post-id.dto';
import { PostsUpdateDto } from './dto/posts-update.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  index(@Query() query: PostsIndexDto) {
    return this.postsService.index(query);
  }

  @Get(':postId')
  show(@Param() param: PostIdDto) {
    return this.postsService.show(param.postId);
  }

  @Post()
  create(@Body() body: PostCreateDto) {
    const userId = '67746ecb-5117-4ce1-846d-5433b75b651e'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.postsService.create(body, userId);
  }

  @Patch(':postId')
  update(@Param() param: PostIdDto, @Body() body: PostsUpdateDto) {
    return this.postsService.update(param.postId, body);
  }

  @Delete(':postId')
  destroy(@Param() param: PostIdDto) {
    const userId = 'cc7a79ce-3b56-4022-b098-09be5d2f482b'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.postsService.destroy(param.postId, userId);
  }
}
