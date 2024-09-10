import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetchFromApi } from '../external';
import { MovieData, MovieResponse } from '../types';
import { ApplicationError } from '../errors';

@Injectable()
export class MoviesService {
  constructor(private configService: ConfigService) {}

  async getMovieList(
    path: 'now_playing' | 'top_rated' | 'popular' | 'upcoming' = 'now_playing',
    opts?: {
      page?: string;
      pageCount?: string;
    },
  ): Promise<MovieResponse> {
    if (opts?.pageCount) {
      const result = await this.getAllMoviesFromPageCount(
        path,
        parseInt(opts.pageCount),
      );
      return result;
    }
    const result = await this.getList(path, opts?.page && parseInt(opts.page));
    return result;
  }

  async getMoviesById(movieIds: string[]): Promise<MovieResponse[]> {
    const requests = movieIds.map((id) => this.getMovieById(id));
    const result = await Promise.all(requests).catch((error) => {
      throw new ApplicationError(`Invalid Ids to fetch: ${movieIds}`);
    });
    return result;
  }

  private async getMovieById(id: string) {
    const basePath = `movie/${id}`;
    return await fetchFromApi<MovieResponse>(
      this.getTMBDUrl(),
      basePath,
      this.getApiKey(),
    );
  }

  private getTMBDUrl() {
    return this.configService.get<string>('TMBD_URL');
  }

  private getApiKey() {
    return this.configService.get<string>('TMBD_API_KEY');
  }

  private async getList(path: string, page: number = 1) {
    const url = this.getTMBDUrl();
    const apiKey = this.getApiKey();
    const composePath = `movie/${path}`;
    const extraParams: Record<string, string> = {
      page: page.toString(),
    };
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
}
