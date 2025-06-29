import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './format-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局前缀
  app.setGlobalPrefix('api');

  // 添加全局拦截器规范响应格式给前端
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
