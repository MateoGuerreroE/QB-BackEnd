import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/modules/repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [RepositoryModule],
})
export class AuthModule {}
