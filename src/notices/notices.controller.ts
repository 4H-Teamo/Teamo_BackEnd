import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { RequestWithUser } from 'src/shared/interfaces/auth.interface';
import { NoticeIdDto } from './dto/notice-id.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index(@Req() req: RequestWithUser) {
    return this.noticesService.index(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':noticeId')
  update(@Param() param: NoticeIdDto) {
    return this.noticesService.update(param.noticeId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':noticeId')
  destroy(@Param() param: NoticeIdDto) {
    return this.noticesService.destroy(param.noticeId);
  }
}
