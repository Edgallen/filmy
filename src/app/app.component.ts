import { Component } from '@angular/core';
import { LoginPage } from './public/pages/login/login.page';

@Component({
  selector: 'app-root',
  imports: [LoginPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {}
