import { Injectable } from '@nestjs/common';
import { handlePrismaError } from 'src/shared/validators/prisma/prisma.exception';
import { ChatRoomCreateDto } from './dto/chat-room-create.dto';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { ChatMessage } from 'generated/prisma-mongo';

@Injectable()
export class ChatRoomsService {
  constructor(private prisma: PrismaMongoService) {}

  async create(body: ChatRoomCreateDto) {
    try {
      const existingRoom = await this.prisma.chatRoom.findFirst({
        where: {
          participants: {
            hasEvery: body.participants,
          },
        },
      });

      if (existingRoom) {
        return existingRoom;
      }

      const newRoom = await this.prisma.chatRoom.create({
        data: {
          ...body,
        },
      });
      return newRoom;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async index(userId: string) {
    try {
      const chatRooms = await this.prisma.chatRoom.findMany({
        where: {
          participants: {
            has: userId,
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return chatRooms;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(chatRoomId: string, messageData: ChatMessage) {
    try {
      const updatedRoom = await this.prisma.chatRoom.update({
        where: { id: chatRoomId },
        data: {
          lastMessage: messageData,
        },
      });
      return updatedRoom;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async destroy(chatRoomId: string) {
    try {
      await this.prisma.chatMessage.deleteMany({
        where: { roomId: chatRoomId },
      });

      const destroyChatRoom = await this.prisma.chatRoom.delete({
        where: {
          id: chatRoomId,
        },
      });
      return destroyChatRoom;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
