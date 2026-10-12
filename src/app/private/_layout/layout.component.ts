import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { debounceTime, filter, map, startWith } from 'rxjs';
import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { SelectComponent } from '../../shared/components/select/select.component';
import { RadioComponent } from '../../shared/components/radio/radio.component';
import { StoreService } from '../../shared/services/store.service';
import { NAV_CONST } from '../../shared/const/menu-items.const';
import { GENRES } from '../../shared/const/genres.const';
import type { IAppStore } from '../../shared/models/app-store.model';
import type { IControlOption } from '../../shared/models/control-option.model';

type Filters = IAppStore['filters'];

@Component({
  selector: 'app-private-layout',
  imports: [
    AsyncPipe,
    RouterModule,
    NgOptimizedImage,
    NavButtonComponent,
    ReactiveFormsModule,
    SearchComponent,
    SelectComponent,
    RadioComponent,
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
  readonly filters = toSignal(this.store.filters$, { requireSync: true });
  readonly genreOptions$ = this.store.genres$.pipe(
    map((genres) =>
      genres.map((genre) => ({
        value: genre.id === 0 ? null : genre.id,
        label: genre.name,
      })),
    ),
  );
  readonly sortOptions: IControlOption[] = [
    { value: 'genre', label: 'По жанру' },
    { value: 'name', label: 'По названию' },
    { value: 'rating', label: 'По рейтингу' },
  ];
  readonly yearOptions: IControlOption[] = Array.from(
    { length: new Date().getFullYear() - 1888 + 1 },
    (_, index) => ({
      value: new Date().getFullYear() - index,
      label: String(new Date().getFullYear() - index),
    }),
  );
  readonly hasSearch = signal(false);
  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    genre: new FormControl<number | null>(null),
    from: new FormControl<number | null>(null),
    to: new FormControl<number | null>(null),
    sort: new FormControl<Filters['sort']>('name', { nonNullable: true }),
  });

  readonly routeState = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let activeRoute = this.route.snapshot;
        while (activeRoute.firstChild) activeRoute = activeRoute.firstChild;
        return { hideSearch: activeRoute.data['hideSearch'] === true };
      }),
    ),
    { requireSync: true },
  );

  ngOnInit(): void {
    this.store.updateData({ genres: GENRES });
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const name = params.get('q') ?? '';
        if (name !== this.filters().name) {
          this.store.updateData({
            filters: this.normalizeFilters({ ...this.filters(), name }),
          });
        }
      });

    this.store.filters$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((filters) => {
        const normalized = this.normalizeFilters(filters);
        if (!this.sameFilters(filters, normalized)) {
          this.store.updateData({ filters: normalized });
          return;
        }
        this.form.patchValue(filters, { emitEvent: false });
        this.syncSearchState(filters.name);
        this.syncQuery(filters.name);
      });

    this.form.controls.name.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((name) => this.syncSearchState(name));

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        map(() => this.normalizeFilters(this.form.getRawValue())),
        filter((filters) => !this.sameFilters(filters, this.filters())),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((filters) => this.store.updateData({ filters }));
  }

  private normalizeFilters(filters: Filters): Filters {
    return filters.name.trim()
      ? filters
      : { ...filters, from: null, to: null, sort: 'name' };
  }

  private sameFilters(a: Filters, b: Filters): boolean {
    return (
      a.name === b.name &&
      a.genre === b.genre &&
      a.from === b.from &&
      a.to === b.to &&
      a.sort === b.sort
    );
  }

  private syncSearchState(name: string): void {
    const active = !!name.trim();
    this.hasSearch.set(active);
    if (!active)
      this.form.patchValue(
        { from: null, to: null, sort: 'name' },
        { emitEvent: false },
      );
    for (const control of [
      this.form.controls.from,
      this.form.controls.to,
      this.form.controls.sort,
    ]) {
      if (active) control.enable({ emitEvent: false });
      else control.disable({ emitEvent: false });
    }
  }

  private syncQuery(name: string): void {
    if ((this.route.snapshot.queryParamMap.get('q') ?? '') === name) return;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: name || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
