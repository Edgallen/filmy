import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesService } from '../../../shared/services/movies.service';
import { StoreService } from '../../../shared/services/store.service';
import { CardComponent } from '../../components/card/card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CardComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage implements OnInit {
  private readonly store = inject(StoreService);
  private readonly moviesService = inject(MoviesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly movies$ = this.store.movies$;
  readonly isLoading = signal(true);

  ngOnInit(): void {
    this.moviesService
      .getMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        this.store.updateData({ movies });
        this.isLoading.set(false);
      });
  }
}
