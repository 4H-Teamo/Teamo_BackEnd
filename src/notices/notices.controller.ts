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
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/shared/interfaces/auth.interface';
import { NoticeIdDto } from './dto/notice-id.dto';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @UseGuards(AuthGuard('access'))
  @Get()
  index(@Req() req: RequestWithUser) {
    return this.noticesService.index(req.user.userId);
  }

  @UseGuards(AuthGuard('access'))
  @Patch(':noticeId')
  update(@Param() param: NoticeIdDto) {
    return this.noticesService.update(param.noticeId);
  }

  @UseGuards(AuthGuard('access'))
  @Delete(':noticeId')
  destroy(@Param() param: NoticeIdDto) {
    return this.noticesService.destroy(param.noticeId);
  }
}
