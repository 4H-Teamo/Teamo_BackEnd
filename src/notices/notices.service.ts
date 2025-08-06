import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/notice-create-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/shared/validators/prisma/prisma.exception';

@Injectable()
export class NoticesService {
  constructor(private prisma: PrismaService) {}

  // 알림 생성 (다른 서비스에서 호출)
  async create(data: CreateNoticeDto) {
    try {
      const createNotice = await this.prisma.notice.create({
        data: {
          userId: data.userId,
          message: data.content,
        },
      });
      return createNotice;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // 내 알림 목록 조회
  async index(userId: string) {
    try {
      //최근 7일 이내의 알림만 조회 (논의 후 수정)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const notices = await this.prisma.notice.findMany({
        where: {
          userId,
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return notices;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // 알림 읽음 처리
  async update(noticeId: string) {
    try {
      const updateNotice = await this.prisma.notice.update({
        where: {
          noticeId,
        },
        data: {
          isRead: true,
        },
      });
      return updateNotice;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // 알림 삭제
  async destroy(noticeId: string) {
    try {
      const destroyNotice = await this.prisma.notice.delete({
        where: {
          noticeId,
        },
      });
      return destroyNotice;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
