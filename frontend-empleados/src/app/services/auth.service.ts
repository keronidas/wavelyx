import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;
  private apiUrl = `${this.url}/auth/login/empleado`
  isAuthenticated = signal<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  constructor() {
    this.loadStateFromLocalStorage();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      { email, password }
    );
  }

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
