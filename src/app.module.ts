import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerModule } from './modules/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import appConfig from './config/app.config';
import { AccessTokenGuard } from './guards';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { TransformInterceptor } from './interceptors/transform.interceptor';
import { MailModule } from './modules/mail/mail.module';
import { PasswordModule } from './modules/password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    PrismaModule,
    LoggerModule,
    AuthModule,
    UserModule,
    MailModule,
    PasswordModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
