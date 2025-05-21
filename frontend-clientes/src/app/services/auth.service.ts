import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isAuthenticated = signal<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  constructor() {
    this.loadStateFromLocalStorage();
  }


  login() {
    this.isAuthenticated.set(true);
    localStorage.setItem('isLoggedIn', 'true');
  }
  getCurrentUserId(): string | null {
    const userData = localStorage.getItem('currentUser');
    console.log('User data raw:', userData); // Añade esta línea para debug
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('User object:', user); // Añade esta línea para debug
        return user._id || user.id || null; // prueba con _id o id
      } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
      }
    }
    return null;
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
