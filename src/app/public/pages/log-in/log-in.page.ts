import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { AuthService } from '../../../shared/services/auth.service';
import { TitleService } from '../../../shared/services/title.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ButtonComponent,
    InputComponent,
    NgOptimizedImage,
    PasswordInputComponent,
  ],
  templateUrl: './log-in.page.html',
  styleUrl: './log-in.page.scss',
})
export class LoginPage {
  readonly title = inject(TitleService).title;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  emailValue = '';
  passwordValue = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authService.login();
    void this.router.navigate(['/private/home']);
  }
}
