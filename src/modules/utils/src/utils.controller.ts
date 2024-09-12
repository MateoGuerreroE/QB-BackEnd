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

  @Get('/movie/videos/:id')
  async getMovieVideos(@Param('id') id: string): Promise<ControllerResponse> {
    try {
      const result = await this.movieService.getMovieVideos(id);
      return new ApplicationResponse(result, 200);
    } catch (error: any) {
      throw new ErrorResponse(
        error.message,
        error.status || error.code || error.statusCode || 500,
      );
    }
  }

  @Get('/movies/recommendations/:id')
  async getMovieRecommendations(
    @Param('id') id: string,
  ): Promise<ControllerResponse> {
    try {
      const { results, ...metadata } = await this.movieService.getMovieList(
        'recommended',
        {
          recommendedId: id,
        },
      );
      return new ApplicationResponse(results, 200, metadata);
    } catch (error: any) {
      throw new ErrorResponse(
        error.message,
        error.status || error.code || error.statusCode || 500,
      );
    }
  }

  @Get('/getGenreList')
  async getMovieGenres(): Promise<ControllerResponse> {
    try {
      const result = await this.movieService.getMovieGenres();
      return new ApplicationResponse(result.genres, 200);
    } catch (error: any) {
      throw new ErrorResponse(
        error.message,
        error.status || error.code || error.statusCode || 500,
      );
    }
  }

  @Get('/movies/genre/:id')
  async getMoviesByGenre(@Param('id') id: string): Promise<ControllerResponse> {
    try {
      const result = await this.movieService.getMoviesByGenre(id);
      const { results, ...metadata } = result;
      return new ApplicationResponse(results, 200, metadata);
    } catch (error: any) {
      throw new ErrorResponse(
        error.message,
        error.status || error.code || error.statusCode || 500,
      );
    }
  }

  @Get('/movies/search')
  async getMoviesByKeyword(@Query('key') key: string) {
    try {
      const result = await this.movieService.getMoviesByKeyword(key);
      const { results, ...metadata } = result;
      return new ApplicationResponse(results, 200, metadata);
    } catch (error: any) {
      throw new ErrorResponse(
        error.message,
        error.status || error.code || error.statusCode || 500,
      );
    }
  }
}
