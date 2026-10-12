import type { IGenre } from '../const/genres.const';
import type { IMovie } from './movie.model';

export interface IAppStore {
  genres: IGenre[];
  movies: IMovie[];
  favorites: IMovie[];
  filters: {
    name: string;
    genre: number | null;
    from: number | null;
    to: number | null;
    sort: 'genre' | 'name' | 'rating';
  };
}
