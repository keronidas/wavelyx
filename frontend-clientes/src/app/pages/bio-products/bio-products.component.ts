import { Component, inject } from '@angular/core';
import { CartIconComponent } from '../../components/cart-icon/cart-icon.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-bio-products',
  imports: [CartIconComponent],
  templateUrl: './bio-products.component.html',
  providers: [ProductsService],
})
export class BioProductsComponent {
  productos: any[] = [];
  private productoService = inject(ProductsService);

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }
}
