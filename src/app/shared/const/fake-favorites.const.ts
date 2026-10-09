import type { IMovie } from '../models/movie.model';

export const FAVORITES: IMovie[] = [
  {
    id: 'm_002',
    title: 'Interstellar',
    releaseYear: 2014,
    genreIds: [2, 4],
    rating: 4.8,
    posterUrl:
      'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
    isFavorite: true,
  },
  {
    id: 'm_006',
    title: 'Inception',
    releaseYear: 2010,
    genreIds: [3, 2, 4],
    rating: 4.6,
    posterUrl:
      'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    isFavorite: true,
  },
];
