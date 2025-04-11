import { Directive, signal, effect } from '@angular/core';
import { CarritoProducto } from '../interfaces/producto-carrito.interface';

@Directive({
  selector: '[appCarrito]',
})
export class CarritoDirective {
  private _carrito = signal<CarritoProducto[]>(this.loadInitialCart());

  carrito = this._carrito.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('carrito', JSON.stringify(this._carrito()));
    });
  }

  private loadInitialCart(): CarritoProducto[] {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  }

  // getCarrito(): number {
  //   this.carrito();
  // }
  addToCarrito(producto: CarritoProducto) {
    this._carrito.update((items) => {
      const existing = items.find((item) => item.id === producto.id);
      return existing
        ? items.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...items, { ...producto, cantidad: 1 }];
    });
  }

  updateCarrito(updateFn: (items: CarritoProducto[]) => CarritoProducto[]) {
    this._carrito.update(updateFn);
  }
}
