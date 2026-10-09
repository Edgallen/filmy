import { Component, input, output } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-search',
  imports: [InputComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  value = input('');

  readonly searchValue = output<string>();

  onSubmit(event: Event): void {
    event.preventDefault();
    this.searchValue.emit(this.value());
  }
}
