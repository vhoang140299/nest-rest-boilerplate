import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators';
import { AccessTokenGuard } from 'src/guards';

@Controller('user')
export class UserController {
  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
