import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  index(@Query('limit') limit: string, @Query('page') page: string) {
    return this.postsService.index(limit, page);
  }
}
