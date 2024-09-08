import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies/movies.service';
import { ApplicationResponse, ControllerResponse } from './responses';

@Controller('/utils')
export class UtilsController {
  constructor(private readonly movieService: MoviesService) {}
  @Get('/movies')
  async getMovies(
    @Query('path') path?: 'now_playing' | 'top_rated' | 'popular',
    @Query('page') page?: string,
    @Query('totalPages') totalPages?: string,
  ): Promise<ControllerResponse> {
    const { results, ...metadata } = await this.movieService.getMovieList(
      path,
      { page, pageCount: totalPages },
    );
    return new ApplicationResponse(results, 200, metadata);
  }
}
