import { NgOptimizedImage } from '@angular/common';
import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CvaControl } from '../control-value-accessor';

import { InputComponent } from '../input/input.component';

type TInputType = 'text' | 'password';
enum EPasswordInputIcons {
  Opened = 'icons/eye_opened.svg',
  Closed = 'icons/eye_closed.svg',
}

@Component({
  selector: 'app-password-input',
  imports: [InputComponent, NgOptimizedImage, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  host: { '(focusout)': 'markTouched()' },
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  standalone: true,
})
export class PasswordInputComponent extends CvaControl<string> {
  prefixIcon = input<string | null>(null);
  placeholder = input<string>('');
  ariaLabel = input('Пароль');
  invalid = input(false);
  describedBy = input<string | null>(null);
  readonly control = new FormControl('', { nonNullable: true });

  readonly type = signal<TInputType>('password');

  readonly buttonIcon = computed(() =>
    this.type() === 'password'
      ? EPasswordInputIcons.Closed
      : EPasswordInputIcons.Opened,
  );

  constructor() {
    super();
    this.control.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.changeValue(value));
  }

  override writeValue(value: string | null): void {
    super.writeValue(value);
    this.control.setValue(value ?? '', { emitEvent: false });
  }

  override setDisabledState(disabled: boolean): void {
    super.setDisabledState(disabled);
    if (disabled) this.control.disable({ emitEvent: false });
    else this.control.enable({ emitEvent: false });
  }

  onButtonToggleClick(): void {
    if (this.disabled()) return;
    this.markTouched();
    this.type.update((type) => (type === 'password' ? 'text' : 'password'));
  }
}
