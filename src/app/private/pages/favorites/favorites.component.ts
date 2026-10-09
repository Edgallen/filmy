import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MoviesService } from '../../../shared/services/movies.service';
import { CardComponent } from '../../components/card/card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, CardComponent, HeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesPages {
  readonly movies$ = inject(MoviesService).getFavorites();

  movieCountLabel(count: number): string {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${count} фильмов`;
    }

    if (lastDigit === 1) {
      return `${count} фильм`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${count} фильма`;
    }

    return `${count} фильмов`;
  }
}
