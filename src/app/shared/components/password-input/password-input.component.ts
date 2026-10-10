import { Component, computed, input, model, output } from '@angular/core';

import { InputComponent } from '../input/input.component';

type TInputType = 'text' | 'password';
enum EPasswordInputIcons {
  Opened = 'icons/eye_opened.svg',
  Closed = 'icons/eye_closed.svg',
}

@Component({
  selector: 'app-password-input',
  imports: [InputComponent],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  standalone: true,
})
export class PasswordInputComponent {
  value = input<string>('');
  iconUrl = input<string | null>(null);
  placeholder = input<string>('');
  disabled = input<boolean>(false);

  type = model<TInputType>('password');

  readonly buttonIcon = computed(() =>
    this.type() === 'password'
      ? EPasswordInputIcons.Closed
      : EPasswordInputIcons.Opened,
  );

  readonly controlValue = output<string>();

  onInput(value: string): void {
    this.controlValue.emit(value);
  }

  onButtonToggleClick(): void {
    this.type.update((type) => (type === 'password' ? 'text' : 'password'));
  }
}
