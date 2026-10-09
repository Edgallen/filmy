import { Component, EventEmitter, input, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-search',
  imports: [InputComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  value = input('');

  @Output() searchValue = new EventEmitter<string>();

  onSubmit(event: Event): void {
    event.preventDefault();
    this.searchValue.emit(this.value());
  }
}
