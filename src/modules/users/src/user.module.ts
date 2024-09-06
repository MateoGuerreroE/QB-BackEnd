import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/modules/utils';
import { UserController } from './user.controller';
import { RepositoryModule } from 'src/modules/repository';

@Module({
  imports: [UtilsModule, RepositoryModule],
  controllers: [UserController],
})
export class UserModule {}
