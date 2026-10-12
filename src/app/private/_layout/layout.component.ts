import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { SearchComponent } from '../../shared/components/search/search.component';

import { StoreService } from '../../shared/services/store.service';

import { NAV_CONST } from '../../shared/const/menu-items.const';
import { GENRES } from '../../shared/const/genres.const';

import type { IAppStore } from '../../shared/models/app-store.model';

@Component({
  selector: 'app-private-layout',
  imports: [
    AsyncPipe,
    RouterModule,
    NgOptimizedImage,
    NavButtonComponent,
    FormsModule,
    SearchComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class PrivateLayoutComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(StoreService);
  private readonly destroyRef = inject(DestroyRef);

  readonly navLinks = NAV_CONST;
  readonly genres$ = this.store.genres$;
  readonly filters = toSignal(this.store.filters$, { requireSync: true });
  readonly sortOptions = [
    { value: 'genre', label: 'По жанру' },
    { value: 'name', label: 'По названию' },
    { value: 'rating', label: 'По рейтингу' },
  ] as const;

  readonly routeState = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let activeRoute = this.route.snapshot;
        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }

        return {
          hideSearch: activeRoute.data['hideSearch'] === true,
        };
      }),
    ),
    { requireSync: true },
  );

  ngOnInit(): void {
    this.store.updateData({ genres: GENRES });
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) =>
        this.updateFilters({ name: params.get('q') ?? '' }),
      );
  }

  updateFilters(filters: Partial<IAppStore['filters']>): void {
    this.store.updateData({ filters: { ...this.filters(), ...filters } });
  }

  onSearch(value: string): void {
    this.updateFilters({ name: value });
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
