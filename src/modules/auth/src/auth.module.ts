import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/modules/repository';

@Module({
  imports: [RepositoryModule],
})
export class AuthModule {}
