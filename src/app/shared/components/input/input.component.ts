import { NgOptimizedImage } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CvaControl } from '../control-value-accessor';

@Component({
  selector: 'app-input',
  imports: [NgOptimizedImage],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
})
export class InputComponent extends CvaControl<string> {
  prefixIcon = input<string | null>(null);
  postfixIcon = input<string | null>(null);
  type = input<string>('text');
  placeholder = input<string>('');
  ariaLabel = input<string | null>(null);
  autocomplete = input('off');
  invalid = input(false);
  describedBy = input<string | null>(null);

  onInput(event: Event) {
    this.changeValue((event.target as HTMLInputElement).value);
  }
}
