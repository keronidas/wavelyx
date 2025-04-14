import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule]
})
export class LoginUserComponent {
  loginForm: FormGroup;
  loginError = '';
  isLoading = false;
  private loginService = inject(LoginService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        // Guardar token simulado y datos de usuario
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error en login', error);
        this.loginError = error.message || 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}