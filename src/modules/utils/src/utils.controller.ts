import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies/movies.service';

@Controller('/utils')
export class UtilsController {
  constructor(private readonly movieService: MoviesService) {}
  @Get('/movies')
  async getMovies() {
    return this.movieService.getMovieList();
  }
}
