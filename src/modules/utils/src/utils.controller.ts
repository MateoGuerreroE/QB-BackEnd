import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies/movies.service';
import {
  ApplicationResponse,
  ControllerResponse,
  ErrorResponse,
} from './responses';

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

  @Post('/movies/ids')
  async getMoviesByIdList(
    @Body() reqBody: { ids: string[] },
  ): Promise<ControllerResponse> {
    if (!reqBody || !reqBody.ids) {
      throw new ErrorResponse('Invalid Request', 400);
    }
    const movieList = await this.movieService.getMoviesById(reqBody.ids);
    return new ApplicationResponse(movieList, 200);
  }

  @Get('movie/:id')
  async getMovie(@Param('id') id: string): Promise<ControllerResponse> {
    try {
      const result = await this.movieService.getMovieById(id);
      return new ApplicationResponse(result, 200);
    } catch (error: any) {
      throw new ErrorResponse(
        error.message,
        error.status || error.code || error.statusCode || 500,
      );
    }
  }
}
