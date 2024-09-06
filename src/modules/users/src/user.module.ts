import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/modules/utils';
import { UserController } from './user.controller';

@Module({
  imports: [UtilsModule],
  controllers: [UserController],
})
export class UserModule {}
