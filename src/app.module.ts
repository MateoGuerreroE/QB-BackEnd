import { Module } from '@nestjs/common';
import { UserModule } from './modules/users';
import { UtilsModule } from './modules/utils';
import { AuthModule } from './modules/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from './modules/repository';
import { JwtStrategy } from './modules/auth/src/utils/jwtStrategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    UserModule,
    UtilsModule,
    AuthModule,
    RepositoryModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
