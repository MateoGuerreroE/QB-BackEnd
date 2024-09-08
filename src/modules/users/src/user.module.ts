import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/modules/utils';
import { UserController } from './user.controller';
import { RepositoryModule } from 'src/modules/repository';
import { UserService } from './user.service';
import { AuthModule } from 'src/modules/auth';

@Module({
  providers: [UserService],
  imports: [UtilsModule, RepositoryModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
