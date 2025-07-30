import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostsIndexDto } from './dto/posts-index.dto';
import { PostCreateDto } from './dto/post-create.dto';
import { handlePrismaError } from '../shared/validators/prisma/prisma.exception';
import { PostsUpdateDto } from './dto/posts-update.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async index(query: PostsIndexDto) {
    const pageNumber = query.page || 1;
    const limitNumber = query.limit || 10;

    const skip = (pageNumber - 1) * limitNumber;

    try {
      const posts = await this.prisma.post.findMany({
        skip,
        take: limitNumber,
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return posts;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async show(postId: string) {
    try {
      //updatedAt을 빼고 전달
      const post = await this.prisma.post.findUnique({
        where: { postId },
        select: {
          postId: true,
          userId: true,
          title: true,
          content: true,
          status: true,
          workMode: true,
          endDate: true,
          capacity: true,
          stacks: true,
          positions: true,
          createdAt: true,
          _count: {
            select: {
              comments: true,
            },
          },
          comments: {
            select: {
              commentId: true,
              userId: true,
              content: true,
              createdAt: true,
            },
          },
        },
      });

      return post;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async create(body: PostCreateDto, userId: string) {
    try {
      const createPost = await this.prisma.post.create({
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
      return createPost;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(postId: string, body: PostsUpdateDto) {
    try {
      const updatePost = await this.prisma.post.update({
        where: {
          postId,
        },
        data: body,
      });
      return updatePost;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async destroy(postId: string, userId: string) {
    try {
      // 유저아이디와 포스트아이디가 일치 => 작성자임.
      const destroyPost = await this.prisma.post.delete({
        where: {
          postId,
          userId,
        },
      });
      return destroyPost;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
