import { Module } from '@nestjs/common';
import { UserModule } from './modules/users';
import { UtilsModule } from './modules/utils';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from './modules/repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    UserModule,
    UtilsModule,
    AuthModule,
    RepositoryModule,
  ],
})
export class AppModule {}
