import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from './dto/users-update.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/shared/validators/prisma/prisma.exception';
import { UsersIndexDto } from './dto/users-index.dto';

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
  async show() {
    const userId = '9af16a94-488a-4224-8d03-9343e8519541'; //TODO : 나중에 guard로 유저아이디를 받는다.
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
  async update(body: UserUpdateDto) {
    const userId = '9af16a94-488a-4224-8d03-9343e8519541'; //TODO : 나중에 guard로 유저아이디를 받는다.
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
  async destroy() {
    const userId = '9af16a94-488a-4224-8d03-9343e8519541'; //TODO : 나중에 guard로 유저아이디를 받는다.
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
  async create() {
    // TODO : nickname 정보 카카오 로그인 후 받아오기
    try {
      const createUser = await this.prisma.user.create({
        data: {
          nickname: '테스트',
        },
      });

      return createUser;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
