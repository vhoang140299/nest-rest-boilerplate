import { MailerModule } from '@nestjs-modules/mailer';
import { Module, Global } from '@nestjs/common';
import { google } from 'googleapis';
import { MailService } from './mail.service';

const { OAuth2 } = google.auth;
const oauth_link = 'https://developers.google.com/oauthplayground';

const MAILING_ID =
  '919217262079-89gu52pqmmqm40lc5g0m88dshu2ska5g.apps.googleusercontent.com';
const MAILING_SECRET = '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';
const MAILING_REFRESH =
  '1//04L1W7EE8EVkWCgYIARAAGAQSNwF-L9Ir5lrRmB6_zCxG3dWPHLe-37x7zdLz_GI0NevZu4T7AlpwowLy7j8MHeM04cEb2YZFub4';

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  // MAILING_REFRESH,
  oauth_link,
);

// const accessToken = auth.getAccessToken();

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'kudokid142@gmail.com',
          clientId:
            '919217262079-89gu52pqmmqm40lc5g0m88dshu2ska5g.apps.googleusercontent.com',
          clientSecret: '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',
          refreshToken:
            '1//04L1W7EE8EVkWCgYIARAAGAQSNwF-L9Ir5lrRmB6_zCxG3dWPHLe-37x7zdLz_GI0NevZu4T7AlpwowLy7j8MHeM04cEb2YZFub4',
          accessToken:
            'ya29.a0AeTM1ieeK3OznoMkFxhXHVUGehpakA--OQBravEaoNZXTooOf6KmLgb0QUUX_wt9dp6MeyAWnWdrivsv1avXI4eGfUSdoxM14wlziSYLGnaJ_g1spL2i9R_mJtTeLyeVvWFZ-zZiYyfM7BKySVvLl2KYGePFaCgYKASISARISFQHWtWOmjXzMpYDofAgmZh3d-kn1Wg0163',
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
