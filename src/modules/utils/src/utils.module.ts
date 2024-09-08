import { Module } from '@nestjs/common';
import { MoviesService } from './movies/movies.service';
import { UtilsController } from './utils.controller';

@Module({
  controllers: [UtilsController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class UtilsModule {}
