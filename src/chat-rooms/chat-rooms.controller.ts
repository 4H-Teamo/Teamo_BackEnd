import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomCreateDto } from './dto/chat-room-create.dto';
import { ChatRoomIdDto } from './dto/chat-room-id.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from 'src/shared/interfaces/auth.interface';

@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: ChatRoomCreateDto) {
    return this.chatRoomsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  index(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.chatRoomsService.index(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':chatRoomId')
  destroy(@Param() param: ChatRoomIdDto) {
    return this.chatRoomsService.destroy(param.chatRoomId);
  }
}
