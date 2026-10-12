import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

import { STORE_DEFAULT_VALUE } from '../const/store-default-value.const';

import type { IAppStore } from '../models/app-store.model';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly store = new BehaviorSubject<IAppStore>({
    ...STORE_DEFAULT_VALUE,
    genres: [...STORE_DEFAULT_VALUE.genres],
    movies: [...STORE_DEFAULT_VALUE.movies],
    favorites: [...STORE_DEFAULT_VALUE.favorites],
    filters: { ...STORE_DEFAULT_VALUE.filters },
  });

  readonly genres$ = this.store.pipe(
    map((state) => state.genres),
    distinctUntilChanged(),
  );
  readonly movies$ = this.store.pipe(
    map((state) => state.movies),
    distinctUntilChanged(),
  );
  readonly favorites$ = this.store.pipe(
    map((state) => state.favorites),
    distinctUntilChanged(),
  );
  readonly filters$ = this.store.pipe(
    map((state) => state.filters),
    distinctUntilChanged(),
  );

  updateData(data: Partial<IAppStore>): void {
    const current = this.store.getValue();
    this.store.next({
      ...current,
      ...data,
      filters: data.filters
        ? { ...current.filters, ...data.filters }
        : current.filters,
    });
  }
}
