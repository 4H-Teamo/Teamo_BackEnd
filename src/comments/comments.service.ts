import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from './dto/comments-create.dto';
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from '../shared/validators/prisma/prisma.exception';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  async create(postId: string, userId: string, body: CommentsCreateDto) {
    try {
      const createComment = await this.prisma.comment.create({
        data: {
          postId,
          userId,
          ...body,
        },
      });
      return createComment;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
