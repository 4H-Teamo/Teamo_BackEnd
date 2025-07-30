import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Query,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersIndexDto } from './dto/users-index.dto';
import { UsersUpdateDto } from './dto/users-update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  index(@Query() query: UsersIndexDto) {
    return this.usersService.index(query);
  }

  @Get('me')
  show() {
    return this.usersService.show();
  }

  @Patch()
  update(@Body() body: UsersUpdateDto) {
    return this.usersService.update(body);
  }

  @Delete()
  destroy() {
    return this.usersService.destroy();
  }

  @Post()
  create() {
    return this.usersService.create();
  }
}
