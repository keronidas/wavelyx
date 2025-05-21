import { Injectable, inject } from '@angular/core';
import { CarritoService } from './carrito.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class PublicarPedidoService {
  private carritoService = inject(CarritoService);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = environment.apiUrl;
  private apiUrl = `${this.url}/pedidos`;

  constructor() { }

  async publicarPedido() {
    const carrito = this.carritoService.carrito();

    console.log('Contenido del carrito:', carrito);

    carrito.forEach((item, i) => {
      console.log(`item[${i}]:`, item);
    });

    const compra_productos = carrito
      .map(item => item.id)
      .filter(id => !!id);

    console.log('compra_productos:', compra_productos);

    const coste_total = carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );

    const usuario_id = this.authService.getCurrentUserId();
    console.log('usuario_id:', usuario_id);

    const payload = {
      compra_productos,
      coste_total: Math.round(coste_total * 100) / 100,
      usuario_id,
    };

    console.log('🧾 Pedido a enviar:', payload);

    try {
      const res = await firstValueFrom(this.http.post(this.apiUrl, payload));
      console.log('✅ Pedido enviado:', res);
      return res;
    } catch (error) {
      console.error('❌ Error al enviar el pedido:', error);
      throw error;
    }
  }


}
