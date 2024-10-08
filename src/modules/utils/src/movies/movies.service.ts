import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetchFromApi } from '../external';
import {
  GenreResponse,
  MovieData,
  MovieResponse,
  VideoInfo,
  VideoReponse,
} from '../types';
import { ApplicationError } from '../errors';

@Injectable()
export class MoviesService {
  constructor(private configService: ConfigService) {}

  async getMovieList(
    path:
      | 'now_playing'
      | 'top_rated'
      | 'popular'
      | 'upcoming'
      | 'recommended' = 'now_playing',
    opts?: {
      page?: string;
      pageCount?: string;
      recommendedId?: string;
    },
  ): Promise<MovieResponse> {
    if (opts?.pageCount) {
      const result = await this.getAllMoviesFromPageCount(
        path,
        parseInt(opts.pageCount),
      );
      return result;
    }
    if (path === 'recommended' && !opts.recommendedId) {
      throw new ApplicationError(
        'Movie id is needed to retrieve recommended movies',
      );
    }
    const result = await this.getList(
      path,
      opts?.page && parseInt(opts.page),
      opts.recommendedId,
    );
    return result;
  }

  async getMoviesById(movieIds: string[]): Promise<MovieResponse[]> {
    const requests = movieIds.map((id) => this.getMovieById(id));
    const result = await Promise.all(requests).catch((error) => {
      throw new ApplicationError(`Invalid Ids to fetch: ${movieIds}, ${error}`);
    });
    return result;
  }

  async getMovieById(id: string): Promise<MovieResponse> {
    const basePath = `movie/${id}`;
    return await fetchFromApi<MovieResponse>(
      this.getTMBDUrl(),
      basePath,
      this.getApiKey(),
    );
  }

  async getMovieVideos(id: string): Promise<VideoInfo[]> {
    const basePath = `movie/${id}/videos`;
    const baseResults = await fetchFromApi<VideoReponse>(
      this.getTMBDUrl(),
      basePath,
      this.getApiKey(),
    );
    return baseResults.results;
  }

  private getTMBDUrl() {
    return this.configService.get<string>('TMBD_URL');
  }

  private getApiKey() {
    return this.configService.get<string>('TMBD_API_KEY');
  }

  private async getList(
    path: string,
    page: number = 1,
    recommendedId?: string,
  ) {
    const url = this.getTMBDUrl();
    const apiKey = this.getApiKey();
    const composePath = `movie/${path}`;
    const extraParams: Record<string, string> = {
      page: page.toString(),
    };
    if (recommendedId) {
      const customPath = `movie/${recommendedId}/recommendations`;
      return fetchFromApi<MovieResponse>(url, customPath, apiKey);
    }
    return fetchFromApi<MovieResponse>(url, composePath, apiKey, extraParams);
  }

  private async getAllMoviesFromPageCount(path: string, times: number) {
    const movies: MovieResponse = {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
    for (let i = movies.page; i <= times; i++) {
      const result = await this.getList(path, i);
      movies.results.push(...result.results);
      if (i === times) {
        movies.total_pages = result.total_pages;
        movies.total_results = result.total_results;
      }
      movies.page = times;
    }
    return movies;
  }

  async getMovieGenres(): Promise<GenreResponse> {
    const customPath = 'genre/movie/list';
    const results = await fetchFromApi<GenreResponse>(
      this.getTMBDUrl(),
      customPath,
      this.getApiKey(),
      {},
    );
    return results;
  }

  async getMoviesByGenre(genreId: string): Promise<MovieResponse> {
    const path = 'discover/movie';
    const params = {
      with_genres: genreId,
    };
    const results = await fetchFromApi<MovieResponse>(
      this.getTMBDUrl(),
      path,
      this.getApiKey(),
      params,
    );
    return results;
  }

  async getMoviesByKeyword(searchKey: string): Promise<MovieResponse> {
    if (!searchKey) throw new ApplicationError('Key is needed');
    const path = 'search/movie';
    const params = {
      query: searchKey,
    };
    const results = await fetchFromApi<MovieResponse>(
      this.getTMBDUrl(),
      path,
      this.getApiKey(),
      params,
    );
    return results;
  }
}
