import { Controller, Get } from '@nestjs/common';
import { MoviesService } from 'src/modules/utils/src/movies/movies.service';
import { MovieData, MovieResponse } from '../../utils';

@Controller()
export class UserController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async testingEndpoint() {
    const movieList: MovieResponse = await this.moviesService.getMovieList();
    return movieList;
  }
}
