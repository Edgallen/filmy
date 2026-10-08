import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

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

  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
