import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class RepositoryModule {}
