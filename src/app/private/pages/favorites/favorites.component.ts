import { Component } from '@angular/core';
import { FAVORITES } from '../../../shared/const/fake-favorites.const';
import { CardComponent } from '../../components/card/card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-favorites',
  imports: [CardComponent, HeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesPages {
  readonly movies = FAVORITES;

  get movieCountLabel(): string {
    const count = this.movies.length;
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
