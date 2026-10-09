import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TitleService } from './title.service';

@Injectable()
export class TitleNavigationStrategy extends TitleStrategy {
  private readonly titleService = inject(TitleService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.titleService.setTitle(this.buildTitle(snapshot) ?? 'Filmy');
  }
}
