import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局前缀
  app.setGlobalPrefix('api');

  // 添加全局拦截器规范响应格式给前端
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  // 添加全局管道
  app.useGlobalPipes(new ValidationPipe());

  // 添加全局异常过滤器
  app.useGlobalFilters(new CustomExceptionFilter());

  // 允许跨域
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
