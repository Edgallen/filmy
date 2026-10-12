import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { IControlOption } from '../../models/control-option.model';
import { CvaControl } from '../control-value-accessor';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent extends CvaControl<string | number> {
  options = input<readonly IControlOption[]>([]);
  name = input.required<string>();

  onSelect(value: string | number | null): void {
    this.changeValue(value);
    this.markTouched();
  }
}
