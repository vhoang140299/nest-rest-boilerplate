import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser, Public } from 'src/decorators';
import { AccessTokenGuard } from 'src/guards';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Public()
  @Get('test')
  test() {
    return this.userService.sendCode();
  }
}
