import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map, startWith, take } from 'rxjs';

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
    ReactiveFormsModule,
  ],
  templateUrl: './log-in.page.html',
  styleUrl: './log-in.page.scss',
})
export class LoginPage implements OnInit {
  readonly title = inject(TitleService).title;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/\S/)]],
  });
  readonly credentials = signal(this.form.getRawValue());
  readonly isSubmitDisabled = signal(true);

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        map(() => this.form.getRawValue()),
        filter(({ email, password }) => !!email.trim() && !!password.trim()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => this.credentials.set(value));

    this.form.valueChanges
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isSubmitDisabled.set(this.form.invalid));

    this.form.statusChanges
      .pipe(startWith(this.form.status), takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => this.isSubmitDisabled.set(status !== 'VALID'));
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.form.disabled) {
      this.isSubmitDisabled.set(true);
      return;
    }
    this.authService.login();
    void this.router.navigate(['/private/home']);
  }
}
