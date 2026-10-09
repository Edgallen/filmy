import { Component, input } from '@angular/core';
import { StarIconComponent } from '../../../shared/components/star-icon/star-icon.component';
import { RatingComponent } from '../rating/rating.component';

import type { IMovie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-card',
  imports: [RatingComponent, StarIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  readonly movie = input<IMovie | null>(null);
}
