import { Module } from '@nestjs/common';
import { UserModule } from './modules/users';
import { UtilsModule } from './modules/utils';
import { AuthModule } from './modules/auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    UserModule,
    UtilsModule,
    AuthModule,
  ],
})
export class AppModule {}
