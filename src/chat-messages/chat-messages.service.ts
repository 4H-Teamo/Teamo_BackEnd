import { Injectable } from '@nestjs/common';
import { ChatMessageCreateDto } from './dto/create-chat-message.dto';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { handlePrismaError } from 'src/shared/validators/prisma/prisma.exception';

@Injectable()
export class ChatMessagesService {
  constructor(private prisma: PrismaMongoService) {}

  async create(body: ChatMessageCreateDto) {
    try {
      const createMessage = await this.prisma.chatMessage.create({
        data: {
          ...body,
        },
      });
      return createMessage;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async index(chatRoomId: string) {
    try {
      const messages = await this.prisma.chatMessage.findMany({
        where: {
          roomId: chatRoomId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return messages;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
