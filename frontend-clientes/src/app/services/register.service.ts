// register.service.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor() {}

  register(userData: any): Observable<any> {
    const userDataWithHashedPassword = {
      ...userData,
      password_hash: sha256(userData.password),
      confirmPassword: undefined,
    };
    console.log(userDataWithHashedPassword);
    delete userDataWithHashedPassword.confirmPassword;

    return this.http
      .post(this.apiUrl, userDataWithHashedPassword)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      errorMessage = `Código: ${error.status}\nMensaje: ${
        error.error.message || error.message
      }`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
