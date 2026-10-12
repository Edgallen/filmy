import { NgOptimizedImage } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CvaControl } from '../control-value-accessor';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-search',
  imports: [InputComponent, NgOptimizedImage, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
  host: { '(focusout)': 'markTouched()' },
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent extends CvaControl<string> {
  readonly control = new FormControl('', { nonNullable: true });

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

  onSearch(): void {
    this.markTouched();
    this.changeValue(this.control.value);
  }
}
