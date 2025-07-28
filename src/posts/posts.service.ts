import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async index(page: string, limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

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
}
