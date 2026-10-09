import { Component, input } from '@angular/core';
import { StarIconComponent } from '../../../shared/components/star-icon/star-icon.component';

@Component({
  selector: 'app-rating',
  imports: [StarIconComponent],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  readonly rating = input<number | null>(null);
  readonly stars = [1, 2, 3, 4, 5];
}
