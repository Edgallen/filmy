import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { FAVORITES } from '../const/fake-favorites.const';
import { MOVIES } from '../const/fake-films.const';
import type { IMovie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  getMovies(): Observable<IMovie[]> {
    return of(MOVIES).pipe(delay(300));
  }

  getFavorites(): Observable<IMovie[]> {
    return of(FAVORITES).pipe(delay(300));
  }
}
