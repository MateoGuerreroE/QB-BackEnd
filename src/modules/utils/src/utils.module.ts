import { Module } from '@nestjs/common';
import { MoviesService } from './movies/movies.service';

@Module({
  providers: [MoviesService],
  exports: [MoviesService],
})
export class UtilsModule {}
