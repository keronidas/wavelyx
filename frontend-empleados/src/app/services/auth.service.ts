// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  constructor(private http: HttpClient) {
    this.loadStateFromLocalStorage();
  }

  // Método de login real
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login/empleado', { email, password });
  }

  // Al hacer login exitoso
  setLoginSuccess() {
    this.isAuthenticated.set(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.isAuthenticated.set(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  get isLoggedIn() {
    return this.isAuthenticated();
  }

  loadStateFromLocalStorage() {
    const loggedInState = localStorage.getItem('isLoggedIn');
    this.isAuthenticated.set(loggedInState === 'true');
  }
}
