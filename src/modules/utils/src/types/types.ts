import { UserRecord } from 'src/modules/repository';

export interface MovieData {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface MovieResponse {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface SignedRequest extends Request {
  user?: Partial<UserRecord>;
}

export interface VideoInfo {
  name: string;
  site: string;
  type: string;
  official: boolean;
  ket: string;
}

export interface VideoReponse {
  id: number;
  results: VideoInfo[];
}

export interface GenreInfo {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: GenreInfo[];
}
