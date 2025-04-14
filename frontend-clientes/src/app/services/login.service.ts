import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor() {}

  login(email: string, password: string): Observable<any> {
    const hashedPassword = sha256(password);

    // Obtener todos los usuarios y buscar coincidencia en el frontend
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email === email && u.password === hashedPassword
        );

        if (!user) {
          console.log(hashedPassword);
          throw new Error('Credenciales incorrectas');
        }

        return {
          token: 'simulated-token-' + user.id, // Token simulado
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse | Error) {
    console.error('Error en el login:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : `Código: ${error.status}\nMensaje: ${
            error.error.message || error.message
          }`;

    return throwError(() => new Error(errorMessage));
  }
}
