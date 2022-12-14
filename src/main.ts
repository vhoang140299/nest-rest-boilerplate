import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MyLogger } from './modules/logger/logger.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExecptionFilter } from './filters/http-execption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExecptionFilter());

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(configService.get('app.port'), async () => {
    const myLogger = await app.resolve(MyLogger);
    myLogger.log(
      `Server listening running on ${configService.get('app.port')}`,
    );
  });
}
bootstrap();
