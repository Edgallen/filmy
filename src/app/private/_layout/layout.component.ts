import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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

import { NAV_CONST } from '../../shared/const/menu-items.const';
import { GENRES } from '../../shared/const/genres.const';

@Component({
  selector: 'app-private-layout',
  imports: [
    RouterModule,
    NgOptimizedImage,
    NavButtonComponent,
    FormsModule,
    SearchComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class PrivateLayoutComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly navLinks = NAV_CONST;
  readonly genres = GENRES;
  selectedGenreId = 0;

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
          query: activeRoute.queryParamMap.get('q') ?? '',
        };
      }),
    ),
    { requireSync: true },
  );

  onSearch(value: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
