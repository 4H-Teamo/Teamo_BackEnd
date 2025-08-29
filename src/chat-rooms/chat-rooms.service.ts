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

      const createRoom = await this.prisma.chatRoom.create({
        data: {
          ...body,
        },
      });
      return createRoom;
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
        orderBy: {
          updatedAt: 'desc',
        },
      });

      const roomsWithDetails = await Promise.all(
        chatRooms.map(async (room) => {
          const unreadCount = await this.prisma.chatMessage.count({
            where: {
              roomId: room.id,
              senderId: {
                not: userId,
              },
              isRead: false,
            },
          });

          return {
            ...room,
            unreadCount: unreadCount,
          };
        }),
      );

      return roomsWithDetails;
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
