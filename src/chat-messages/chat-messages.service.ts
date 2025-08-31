import { Injectable } from '@nestjs/common';
import { ChatMessageCreateDto } from './dto/create-chat-message.dto';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { handlePrismaError } from 'src/shared/validators/prisma/prisma.exception';

@Injectable()
export class ChatMessagesService {
  constructor(private prisma: PrismaMongoService) {}

  async create(data: ChatMessageCreateDto) {
    try {
      const message = await this.prisma.$transaction(async (tx) => {
        const createMessage = await tx.chatMessage.create({
          data: {
            ...data,
            senderId: data.userId,
          },
        });

        await tx.chatRoom.update({
          where: { id: data.roomId },
          data: {
            lastMessage: createMessage,
          },
        });

        return createMessage;
      });

      return message;
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

  async update(chatRoomId: string, userId: string) {
    try {
      const result = await this.prisma.chatMessage.updateMany({
        where: {
          roomId: chatRoomId,
          isRead: false,
          senderId: { not: userId },
        },
        data: {
          isRead: true,
        },
      });
      return result;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
