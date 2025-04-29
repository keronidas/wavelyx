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
