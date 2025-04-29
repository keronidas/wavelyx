// login.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showError();
      return;
    }

    this.isPosting.set(true);
    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        if (response.access_token) {
          localStorage.setItem('authToken', response.access_token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.authService.setLoginSuccess();
          console.log('Login exitoso');
          this.router.navigate(['']);
        } else {
          this.showError();
        }
        this.isPosting.set(false);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.showError();
        this.isPosting.set(false);
      },
    });
  }

  private showError() {
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}
