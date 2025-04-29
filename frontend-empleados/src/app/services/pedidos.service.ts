import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl = `${environment.apiUrl}/pedidos`;
  private http = inject(HttpClient);
  constructor() {}

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  actualizarEstadoPedido(
    pedidoId: string,
    nuevoEstado: string
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${pedidoId}`, {
      estado: nuevoEstado,
    });
  }
}
