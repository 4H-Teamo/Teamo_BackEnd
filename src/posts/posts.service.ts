import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostsIndexDto } from './dto/posts-index.dto';
import { PostsCreateDto } from './dto/posts-create.dto';
import { handlePrismaError } from '../shared/validators/prisma/prisma.exception';
import { PostsUpdateDto } from './dto/posts-update.dto';

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

  async show(postId: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          postId,
        },
      });
      return post;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async create(body: PostsCreateDto, userId: string) {
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
      const checkAuthentication = await this.prisma.post.findUnique({
        where: {
          postId,
        },
      });
      if (!checkAuthentication) {
        throw new NotFoundException('게시글 작성자를 찾을 수 없습니다.');
      }

      if (checkAuthentication.userId !== userId) {
        throw new UnauthorizedException('작성자만 삭제 요청을 할 수 있습니다.');
      }

      const destroyPost = await this.prisma.post.delete({
        where: {
          postId,
        },
      });
      return destroyPost;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
