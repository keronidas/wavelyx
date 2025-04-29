import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos/usuario'; 

  constructor(private http: HttpClient) {}

  getPedidosByUserId(usuario_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuario_id}`);
  }
}
