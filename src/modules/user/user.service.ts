import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(private mailService: MailService) {}

  generateCode(length) {
    let code = '';
    const schema = '0123456789';

    for (let i = 0; i < length; i++) {
      code += schema.charAt(Math.floor(Math.random() * schema.length));
    }

    return code;
  }

  sendCode() {
    const code = this.generateCode(5);
    this.mailService.senResetCode('vhoang140299@gmail.com', code);
  }
}
