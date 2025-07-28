import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostsIndexDto } from './dto/posts-index.dto';
import { PostsCreateDto } from './dto/posts-create.dto';
import { handlePrismaError } from '../shared/validators/prisma/prisma.exception';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async index(query: PostsIndexDto) {
    const pageNumber = query.page || 1;
    const limitNumber = query.limit || 10;

    const skip = (pageNumber - 1) * limitNumber;

    const posts = await this.prisma.post.findMany({
      skip,
      take: limitNumber,
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return posts;
  }

  async create(body: PostsCreateDto, userId: string) {
    try {
      const post = await this.prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          workMode: body.workMode,
          endDate: body.endDate,
          capacity: body.capacity,
          stacks: body.stacks,
          positions: body.positions,
          userId,
        },
      });
      return post;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
