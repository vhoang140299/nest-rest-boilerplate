import { PasswordDto } from './dto/password.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { Public } from 'src/decorators';

import { PasswordService } from './password.service';
import { ValidateResetCodeDto } from './dto/validate-reset-code.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Public()
  @Post('sendResetCode')
  async sendResetCode(@Body() data: PasswordDto) {
    return await this.passwordService.sendResetPassword(data);
  }

  @Public()
  @Post('validateResetCode')
  async validateCode(@Body() data: ValidateResetCodeDto) {
    return await this.passwordService.validateResetCode(data);
  }

  @Public()
  @Post('changePassword')
  async changePassword(@Body() data: ChangePasswordDto) {
    return await this.passwordService.changePassword(data);
  }
}
