import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './public/_layout/layout.component';
import { PrivateLayoutComponent } from './private/_layout/layout.component';

import { LoginPage } from './public/pages/log-in/log-in.page';
import { HomePage } from './private/pages/home/home.component';
import { FavoritesPages } from './private/pages/favorites/favorites.component';

import { authGuard } from './shared/guard/auth-guard';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LoginPage,
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
  {
    path: 'private',
    canActivate: [authGuard],
    component: PrivateLayoutComponent,
    children: [
      {
        path: 'home',
        title: 'Главная',
        data: { hideSearch: false },
        component: HomePage,
      },
      {
        path: 'favorites',
        title: 'Избранное',
        data: { hideSearch: true },
        component: FavoritesPages,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];
