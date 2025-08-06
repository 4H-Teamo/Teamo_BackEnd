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
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/shared/interfaces/auth.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  index(@Query() query: UsersIndexDto) {
    return this.usersService.index(query);
  }

  @UseGuards(AuthGuard('access'))
  @Get('me')
  show(@Req() req: RequestWithUser) {
    return this.usersService.show(req.user.userId);
  }

  @UseGuards(AuthGuard('access'))
  @Patch()
  update(@Body() body: UserUpdateDto, @Req() req: RequestWithUser) {
    return this.usersService.update(body, req.user.userId);
  }

  @UseGuards(AuthGuard('access'))
  @Delete()
  destroy(@Req() req: RequestWithUser) {
    return this.usersService.destroy(req.user.userId);
  }
}
