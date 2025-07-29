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
import { PostsCreateDto } from './dto/posts-create.dto';
import { PostsIdDto } from './dto/posts-id.dto';
import { PostsUpdateDto } from './dto/posts-update.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  index(@Query() query: PostsIndexDto) {
    return this.postsService.index(query);
  }

  @Post()
  create(@Body() body: PostsCreateDto) {
    const userId = 'cc7a79ce-3b56-4022-b098-09be5d2f482b'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.postsService.create(body, userId);
  }

  @Patch(':postId')
  update(@Param() param: PostsIdDto, @Body() body: PostsUpdateDto) {
    return this.postsService.update(param.postId, body);
  }

  @Delete(':postId')
  destroy(@Param() param: PostsIdDto) {
    const userId = 'cc7a79ce-3b56-4022-b098-09be5d2f482b'; //TODO : 나중에 guard로 유저아이디를 받는다.
    return this.postsService.destroy(param.postId, userId);
  }
}
