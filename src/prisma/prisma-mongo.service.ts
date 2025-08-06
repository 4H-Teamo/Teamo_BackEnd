import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma-mongo';

@Injectable()
export class PrismaMongoService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}