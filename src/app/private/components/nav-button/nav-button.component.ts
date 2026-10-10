import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  imports: [NgOptimizedImage],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  text = input('');
  iconUrl = input('');
  disabled = input(false);
  isActive = input(false);

  readonly clicked = output<Event>();

  onClick(event: Event): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
