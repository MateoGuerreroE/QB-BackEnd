import { Module } from '@nestjs/common';
import { UserModule } from './modules/users';
import { UtilsModule } from './modules/utils';
import { AuthModule } from './modules/auth';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from './modules/repository';

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
})
export class AppModule {}
