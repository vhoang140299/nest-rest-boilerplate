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

// // import {
// //   CallHandler,
// //   ExecutionContext,
// //   Injectable,
// //   NestInterceptor,
// // } from '@nestjs/common';
// // import { Reflector } from '@nestjs/core';
// // import { Observable } from 'rxjs/internal/Observable';
// // import { Response } from 'express';

// // @Injectable()
// // export class TransformationInterceptor<T>
// //   implements NestInterceptor<T, Response<T>>
// // {
// //   constructor(private reflector: Reflector) {}

// //   intercept(
// //     context: ExecutionContext,
// //     next: CallHandler,
// //   ): Observable<Response<T>> {
// //     const responseMessage =
// //       this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
// //       '';

// //     return next.handle().pipe(
// //       map((data) => ({
// //         data,
// //         statusCode: context.switchToHttp().getResponse().statusCode,
// //         message: responseMessage,
// //       })),
// //     );
// //   }
// // }
