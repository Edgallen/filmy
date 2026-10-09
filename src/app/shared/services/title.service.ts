import { inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private readonly documentTitle = inject(Title);
  private readonly activeTitle = signal('');

  readonly title = this.activeTitle.asReadonly();

  setTitle(title: string): void {
    this.activeTitle.set(title);
    this.documentTitle.setTitle(title);
  }
}
