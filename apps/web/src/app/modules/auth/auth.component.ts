import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/loginForm/login-form.component';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {}
