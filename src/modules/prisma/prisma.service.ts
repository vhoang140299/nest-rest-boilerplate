// import {
//   Injectable,
//   OnModuleInit,
//   INestApplication,
//   Logger,
// } from '@nestjs/common';
// import { Prisma, PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService
//   extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
//   implements OnModuleInit
// {
//   private readonly logger = new Logger(PrismaService.name);

//   constructor() {
//     super({
//       log: [
//         {
//           emit: 'event',
//           level: 'query',
//         },
//         {
//           emit: 'event',
//           level: 'error',
//         },
//         {
//           emit: 'event',
//           level: 'info',
//         },
//         {
//           emit: 'event',
//           level: 'warn',
//         },
//       ],
//     });
//   }

//   async onModuleInit() {
//     this.$on('error', (event) => {
//       this.logger.error(event);
//     });
//     this.$on('warn', (event) => {
//       this.logger.warn(event);
//     });
//     this.$on('info', (event) => {
//       this.logger.verbose(event);
//     });
//     this.$on('query', (event) => {
//       this.logger.log(event);
//     });
//     // this.$on('error', (event) => {
//     //   this.logger.verbose(event.target);
//     // });
//     await this.$connect();
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close();
//     });
//   }
// }

import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { PRISMA_CLIENT_OPTIONS } from './prisma.config';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ ...PRISMA_CLIENT_OPTIONS });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('error', (_e) => {
      // Do something
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
