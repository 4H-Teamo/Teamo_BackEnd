import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessageCreateDto } from './dto/create-chat-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ChatRoomIdDto } from 'src/chat-rooms/dto/chat-room-id.dto';

@Controller('chat-messages')
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: ChatMessageCreateDto) {
    return this.chatMessagesService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':roomId')
  index(@Param() param: ChatRoomIdDto) {
    return this.chatMessagesService.index(param.chatRoomId);
  }
}
