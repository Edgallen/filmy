import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { NAV_CONST } from '../../shared/const/menu-items.const';

@Component({
  selector: 'app-private-layout',
  imports: [RouterModule, NgOptimizedImage, NavButtonComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class PrivateLayoutComponent {
  readonly navLinks = NAV_CONST;
}
