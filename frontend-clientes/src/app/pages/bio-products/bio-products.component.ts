import { Component, inject } from '@angular/core';
import { CartIconComponent } from '../../components/cart-icon/cart-icon.component';
import { ProductsService } from '../../services/products.service';
import { CarritoDirective } from '../../directives/carrito.directive';
import { CarritoProducto } from '../../interfaces/producto-carrito.interface';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-bio-products',
  imports: [CartIconComponent],
  templateUrl: './bio-products.component.html',
  providers: [ProductsService, CarritoDirective],
})
export class BioProductsComponent {
  private carritoDirective = inject(CarritoDirective);
  productos: Producto[] = [];
  private productoService = inject(ProductsService);

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  addToCarrito(product: Producto): void {
    const nuevoProducto: CarritoProducto = {
      id: product.id_producto,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: 1,
    };
    this.carritoDirective.addToCarrito(nuevoProducto)
  }
}
