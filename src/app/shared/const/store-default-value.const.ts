import type { IAppStore } from '../models/app-store.model';

export const STORE_DEFAULT_VALUE: IAppStore = {
  genres: [],
  movies: [],
  favorites: [],
  filters: {
    name: '',
    genre: null,
    from: null,
    to: null,
    sort: 'name',
  },
};
