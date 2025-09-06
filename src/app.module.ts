import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { NoticesModule } from './notices/notices.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { ChatMessagesModule } from './chat-messages/chat-messages.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    NoticesModule,
    AnalysisModule,
    ChatRoomsModule,
    ChatMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
