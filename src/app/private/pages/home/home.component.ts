import { Component } from '@angular/core';

import { MOVIES } from '../../../shared/const/fake-films.const';

import type { IMovie } from '../../../shared/models/movie.model';
import { CardComponent } from '../../components/card/card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage {
  movies: IMovie[] = MOVIES;
}
