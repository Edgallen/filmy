import type { IMovie } from '../models/movie.model';

export const MOVIES: IMovie[] = [
  {
    id: 'm_002',
    title: 'Interstellar',
    releaseYear: 2014,
    genreIds: [2, 4],
    rating: 4.8,
    posterUrl:
      'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
    isFavorite: true,
    description:
      'Экспедиция за пределы привычного мира ради будущего человечества.',
    durationMin: 169,
  },
  {
    id: 'm_004',
    title: 'Mad Max: Fury Road',
    releaseYear: 2015,
    genreIds: [3, 4],
    rating: 4.3,
    posterUrl:
      'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg',
    isFavorite: false,
    description: 'Дорога ярости, топливо и борьба за свободу.',
    durationMin: 120,
  },
  {
    id: 'm_005',
    title: 'The Notebook',
    releaseYear: 2004,
    genreIds: [1],
    rating: 4.2,
    posterUrl:
      'https://upload.wikimedia.org/wikipedia/en/8/86/Posternotebook.jpg',
    isFavorite: false,
    description: 'История любви, рассказанная сквозь годы.',
    durationMin: 124,
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
    description: 'Во сне внутри сна, где реальность под вопросом.',
    durationMin: 148,
  },
];
