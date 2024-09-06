import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetchFromApi } from '../external';
import { MovieData, MovieResponse } from '../types';

@Injectable()
export class MoviesService {
  constructor(private configService: ConfigService) {}

  async getMovieList(): Promise<MovieResponse> {
    const url = this.getTMBDUrl();
    const apiKey = this.getApiKey();
    const path = 'movie/popular';
    const result = await fetchFromApi<MovieResponse>(url, path, apiKey);
    return result;
  }

  private getTMBDUrl() {
    return this.configService.get<string>('TMBD_URL');
  }

  private getApiKey() {
    return this.configService.get<string>('TMBD_API_KEY');
  }
}
