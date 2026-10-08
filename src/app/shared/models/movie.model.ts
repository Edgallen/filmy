export interface IMovie {
  id: string;
  title: string;
  releaseYear: number;
  genreIds: number[];
  rating: number;
  posterUrl: string;
  description?: string;
  durationMin?: number;
  isFavorite: boolean;
}
