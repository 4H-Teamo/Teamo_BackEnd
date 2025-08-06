import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from './dto/users-update.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/shared/validators/prisma/prisma.exception';
import { UsersIndexDto } from './dto/users-index.dto';
import { UserCreateDto } from './dto/users-create.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // public 유저 조회
  async index(query: UsersIndexDto) {
    const pageNumber = query.page || 1;
    const limitNumber = query.limit || 10;

    const skip = (pageNumber - 1) * limitNumber;

    try {
      const users = await this.prisma.user.findMany({
        skip,
        take: limitNumber,
        where: {
          isPublic: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return users;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // 마이페이지 - 특정 유저 조회
  async show(userId: string) {
    try {
      const showUser = await this.prisma.user.findUnique({
        where: {
          userId,
        },
      });
      return showUser;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // 마이페이지 - 유저 정보 수정
  async update(body: UserUpdateDto, userId: string) {
    try {
      const updateUser = await this.prisma.user.update({
        where: { userId },
        data: {
          nickname: body.nickname,
          description: body.description,
          location: body.location,
          image: body.image,
          github: body.github,
          workMode: body.workMode,
          beginner: body.beginner,
          isPublic: body.isPublic,
          stacks: body.stacks,
          positionId: body.positionId,
        },
      });
      return updateUser;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // 유저 탈퇴
  async destroy(userId: string) {
    try {
      const destroyUser = await this.prisma.user.delete({
        where: {
          userId,
        },
      });
      return destroyUser;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // 유저 생성
  async create(data: UserCreateDto) {
    try {
      const user = await this.prisma.$transaction(async (tx) => {
        const createUser = await tx.user.create({
          data: {
            nickname: data.nickname,
          },
        });

        await tx.social.create({
          data: {
            userId: createUser.userId,
            externalId: data.kakaoId,
            provider: data.provider,
          },
        });

        return createUser;
      });
      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
