import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MoviesService } from '../../../shared/services/movies.service';
import { CardComponent } from '../../components/card/card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CardComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage {
  readonly movies$ = inject(MoviesService).getMovies();
}
