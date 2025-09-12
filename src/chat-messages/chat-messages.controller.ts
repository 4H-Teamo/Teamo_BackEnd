import { Controller, Get, UseGuards, Param, Req } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ChatRoomIdDto } from 'src/chat-rooms/dto/chat-room-id.dto';
import { RequestWithUser } from 'src/shared/interfaces/auth.interface';

@Controller('chat-messages')
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  /* 소켓으로 대체
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: ChatMessageCreateDto, @Req() req: RequestWithUser) {
    const user = req.user;
    return this.chatMessagesService.create(body, user.userId);
  }
  */

  @UseGuards(JwtAuthGuard)
  @Get(':chatRoomId')
  index(@Param() param: ChatRoomIdDto) {
    return this.chatMessagesService.index(param.chatRoomId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':chatRoomId')
  update(@Param() param: ChatRoomIdDto, @Req() req: RequestWithUser) {
    const user = req.user;
    return this.chatMessagesService.update(param.chatRoomId, user.userId);
  }
}
