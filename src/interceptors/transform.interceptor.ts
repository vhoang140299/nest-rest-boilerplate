// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface Response<T> {
//   statusCode: number;
//   message: string;
//   data: T;
// }

// @Injectable()
// export class TransformInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       map((data) => ({
//         statusCode: context.switchToHttp().getResponse().statusCode,
//         message: data.message,
//         data: {
//           result: data,
//           meta: {},
//         },
//       })),
//     );
//   }
// }

// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
//   HttpStatus,
// } from '@nestjs/common';
// import { map, Observable } from 'rxjs';

// @Injectable()
// export class TransformInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       map((value) => {
//         value = value ? value : [];
//         return {
//           statusCode: context.switchToHttp().getResponse().statusCode,
//           status: 'success',
//           data: value,
//         };
//       }),
//     );
//   }
// }

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        data,
        message: 'success',
      })),
    );
  }
}
