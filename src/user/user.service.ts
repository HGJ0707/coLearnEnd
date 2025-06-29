import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser() {
    const user = await this.prisma.users.create({
      data: {
        account: 'test@example.com',
        username: '测试用户',
        password: '123456',
        state: 1,
      },
    });

    return user;
  }
}
