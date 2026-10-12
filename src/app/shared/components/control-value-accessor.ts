import { signal } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';

export abstract class CvaControl<T> implements ControlValueAccessor {
  readonly value = signal<T | null>(null);
  readonly disabled = signal(false);

  private onChange: (value: T | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(callback: (value: T | null) => void): void {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  changeValue(value: T | null): void {
    if (this.disabled()) return;
    this.value.set(value);
    this.onChange(value);
  }

  markTouched(): void {
    if (!this.disabled()) this.onTouched();
  }
}
