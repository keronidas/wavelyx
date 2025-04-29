import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Cambiamos el nombre a isAuthenticated para evitar el conflicto
  isAuthenticated = signal<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  constructor() {
    this.loadStateFromLocalStorage(); // Asegura que el estado se cargue al inicio
  }

  // Método para iniciar sesión
  login() {
    this.isAuthenticated.set(true); // Cambiamos el estado de la señal a true
    localStorage.setItem('isLoggedIn', 'true'); // Guardamos en localStorage
  }

  // Método para cerrar sesión
  logout() {
    this.isAuthenticated.set(false); // Cambiamos el estado de la señal a false
    localStorage.setItem('isLoggedIn', 'false'); // Guardamos en localStorage
    localStorage.removeItem('authToken'); // Opcional: Elimina el token de autenticación
    localStorage.removeItem('currentUser'); // Opcional: Elimina los datos del usuario
  }

  // Método para verificar si el usuario está logueado
  get isLoggedIn() {
    return this.isAuthenticated(); // Cambiamos aquí a la nueva propiedad
  }

  // Para obtener el estado del usuario logueado desde localStorage
  loadStateFromLocalStorage() {
    const loggedInState = localStorage.getItem('isLoggedIn');
    this.isAuthenticated.set(loggedInState === 'true'); // Inicializamos la señal con el valor en localStorage
  }
}
