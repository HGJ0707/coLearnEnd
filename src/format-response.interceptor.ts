import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

// 定义响应数据接口
interface ResponseData {
  msg?: string;
  [key: string]: any;
}

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: ResponseData) => {
        let msg = 'success';
        if (data?.msg) {
          msg = data.msg;
          delete data.msg;
        }
        return {
          // 状态码
          code: response.statusCode,
          // 返回信息
          msg,
          // 返回数据
          data,
        };
      }),
    );
  }
}
