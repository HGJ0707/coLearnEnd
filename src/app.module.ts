import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { FileModule } from './file/file.module';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginGuard } from './login.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: '159357',
          signOptions: {
            expiresIn: '7d', // 默认 7 天
          },
        };
      },
    }),
    UserModule,
    ClassModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
