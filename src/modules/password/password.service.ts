import { Injectable, BadRequestException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PasswordDto } from './dto/password.dto';
import * as argon2 from 'argon2';
import { ValidateResetCodeDto } from './dto/validate-reset-code.dto';

@Injectable()
export class PasswordService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  generateCode(length) {
    let code = '';
    const schema = '0123456789';

    for (let i = 0; i < length; i++) {
      code += schema.charAt(Math.floor(Math.random() * schema.length));
    }

    return code;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async sendResetPassword(data: PasswordDto) {
    console.log('email', data?.email);
    const user = await this.prismaService.user.findFirst({
      where: {
        email: data?.email,
      },
    });

    // console.log('user', user);
    await this.prismaService.code.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const code = this.generateCode(5);

    await this.prismaService.code.create({
      data: {
        code,
        userId: user.id,
      },
    });

    console.log('c');

    const b = await this.mailService.senResetCode(data.email, code);
    console.log('b', b);
  }

  async validateResetCode(data: ValidateResetCodeDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const dbCode = await this.prismaService.code.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (dbCode.code !== data.code) {
      throw new BadRequestException('Verification code is wrong..');
    }

    return dbCode;
  }

  async changePassword(data: ChangePasswordDto) {
    const hash = await this.hashData(data.password);

    await this.prismaService.user.update({
      where: {
        email: data.email,
      },
      data: {
        password: hash,
      },
    });
  }
}
