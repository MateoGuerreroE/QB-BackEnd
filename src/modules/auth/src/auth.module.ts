import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/modules/repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
  imports: [RepositoryModule],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
