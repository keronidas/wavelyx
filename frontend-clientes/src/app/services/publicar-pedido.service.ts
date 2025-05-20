import { Injectable, inject } from '@angular/core';
import { CarritoService } from './carrito.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicarPedidoService {
  private carritoService = inject(CarritoService);
  private http = inject(HttpClient);

  constructor() {}

  async publicarPedido() {
    const carrito = this.carritoService.carrito();

    // Sacamos los _id reales del producto
    const compra_productos = carrito
      .map((item) => item.detalles?.producto?._id)
      .filter((id) => !!id); // evitamos null/undefined

    const coste_total = carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );

    const payload = {
      compra_productos,
      coste_total: Math.round(coste_total * 100) / 100,
    };

    console.log('🧾 Pedido a enviar:', payload);

    try {
      const res = await firstValueFrom(
        this.http.post('http://localhost:3000/api/pedidos', payload)
      );
      console.log('✅ Pedido enviado:', res);
      return res;
    } catch (error) {
      console.error('❌ Error al enviar el pedido:', error);
      throw error;
    }
  }
}
