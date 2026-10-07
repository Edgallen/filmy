import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { LayoutComponent } from '../../_layout/layout.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';

@Component({
  selector: 'app-login-page',
  imports: [
    LayoutComponent,
    ButtonComponent,
    InputComponent,
    NgOptimizedImage,
    PasswordInputComponent,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  standalone: true,
})
export class LoginPage {
  emailValue = '';
  passwordValue = '';

  onSubmit(event: Event): void {
    event.preventDefault();
  }
}
