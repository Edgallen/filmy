import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesService } from '../../../shared/services/movies.service';
import { StoreService } from '../../../shared/services/store.service';
import { CardComponent } from '../../components/card/card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, CardComponent, HeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesPages implements OnInit {
  private readonly store = inject(StoreService);
  private readonly moviesService = inject(MoviesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly movies$ = this.store.favorites$;
  readonly isLoading = signal(true);

  ngOnInit(): void {
    this.moviesService
      .getFavorites()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((favorites) => {
        this.store.updateData({ favorites });
        this.isLoading.set(false);
      });
  }

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
