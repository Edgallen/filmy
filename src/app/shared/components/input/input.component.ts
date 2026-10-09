import { Component, input, output } from '@angular/core';

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
  ariaLabel = input<string | null>(null);
  disabled = input<boolean>(false);

  readonly controlValue = output<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.controlValue.emit(input.value);
  }
}
