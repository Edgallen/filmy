import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
})
export class InputComponent {
  value = input<string>('');
  iconUrl = input<string | null>(null);
  type = input<string>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);

  @Output()
  controlValue: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.controlValue.emit(input.value);
  }
}
