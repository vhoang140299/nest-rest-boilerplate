import { Controller, Body, Post, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() signupDto: AuthDto) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post('signin')
  signin(@Body() signinDto: AuthDto) {
    return this.authService.signIn(signinDto);
  }

  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
