import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  passwordMismatch = false;
  private registerService = inject(RegisterService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        telefono: [
          '',
          [Validators.required, Validators.pattern(/^(\+34)?\s?(\d{9})$/)],
        ],
        direccion: this.formBuilder.group({
          calle: ['', Validators.required],
          ciudad: ['', Validators.required],
          codigo_postal: ['', Validators.required],
          pais: ['', Validators.required],
        }),
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  checkPasswords() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    this.passwordMismatch = password !== confirmPassword;
  }

  get f() {
    return this.registerForm.controls;
  }

  get d() {
    return (this.registerForm.get('direccion') as FormGroup).controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.checkPasswords();

    if (this.registerForm.invalid || this.passwordMismatch) {
      return;
    }

    const formData = this.registerForm.value;
    const userData = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
      password: formData.password,
    };

    this.registerService.register(userData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error detallado:', error);
        if (error.status === 500) {
          alert(
            'Error en el servidor: ' +
              (error.error.message || 'Por favor contacta al administrador')
          );
        } else {
          alert(
            'Error en el registro: ' + (error.message || 'Intenta nuevamente')
          );
        }
      },
    });
  }
}
