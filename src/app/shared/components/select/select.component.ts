import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { IControlOption } from '../../models/control-option.model';
import { CvaControl } from '../control-value-accessor';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends CvaControl<string | number> {
  options = input<readonly IControlOption[]>([]);
  placeholder = input('Выберите');
  ariaLabel = input('');

  selectedIndex(): number {
    return this.options().findIndex((option) => option.value === this.value());
  }

  onSelect(event: Event): void {
    const index = Number((event.target as HTMLSelectElement).value);
    this.changeValue(this.options()[index]?.value ?? null);
    this.markTouched();
  }
}
