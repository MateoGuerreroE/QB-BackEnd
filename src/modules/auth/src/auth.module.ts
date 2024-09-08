import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/modules/repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './utils/jwtStrategy';

@Module({
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
  imports: [
    RepositoryModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
