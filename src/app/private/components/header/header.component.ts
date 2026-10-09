import { Component, inject } from '@angular/core';
import { TitleService } from '../../../shared/services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly title = inject(TitleService).title;
}
