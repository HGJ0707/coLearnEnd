import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

interface JwtUserData {
  uid: number;
  userID: number;
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const requireLogin = this.reflector.getAllAndOverride<boolean>(
      'require-login',
      [context.getClass(), context.getHandler()],
    );

    // 如果不需要登录，则直接返回 true
    if (!requireLogin) {
      return true;
    }

    // 如果请求头没有 authorization 字段，则抛出异常
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const token: string = authorization.split(' ')[1];
      // const data = this.jwtService.verify<JwtUserData>(token);
      // (request as any).userInfo = {
      //   uid: data.uid,
      //   userID: data.userID,
      // };
      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }
}
