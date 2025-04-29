import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth/login/usuario';

  constructor() {}

  login(email: string, password: string): Observable<any> {
    const hashedPassword = sha256(password);


    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        if (response && response.access_token && response.user) {

          localStorage.setItem('access_token', response.access_token);

          return {
            user: response.user,
            token: response.access_token,
          };
        } else {
          throw new Error('Token o datos del usuario no recibidos');
        }
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
