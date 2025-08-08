import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersIndexDto } from './dto/users-index.dto';
import { UserUpdateDto } from './dto/users-update.dto';
import { RequestWithUser } from 'src/shared/interfaces/auth.interface';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  index(@Query() query: UsersIndexDto) {
    return this.usersService.index(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  show(@Req() req: RequestWithUser) {
    return this.usersService.show(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() body: UserUpdateDto, @Req() req: RequestWithUser) {
    return this.usersService.update(body, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  destroy(@Req() req: RequestWithUser) {
    return this.usersService.destroy(req.user.userId);
  }
}
