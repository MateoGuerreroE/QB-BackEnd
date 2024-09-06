import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser() {
    return this.prisma.user.create({
      data: {
        firstName: 'Hello',
        lastName: 'Moto',
        emailAddress: 'helloMoto@gmail.com',
        createdBy: 'Me',
        updatedBy: 'Me',
      },
    });
  }
}
