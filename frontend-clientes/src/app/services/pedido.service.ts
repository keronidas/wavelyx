import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}/pedidos/usuario`
  private http = inject(HttpClient);
  constructor() { }

  getPedidosByUserId(usuario_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuario_id}`);
  }
}
