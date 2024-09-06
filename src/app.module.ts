import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users';
import { UtilsModule } from './modules/utils';

@Module({
  imports: [UsersModule, UtilsModule],
})
export class AppModule {}
