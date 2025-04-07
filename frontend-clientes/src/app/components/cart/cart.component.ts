import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartIconComponent } from '../cart-icon/cart-icon.component';

@Component({
  selector: 'app-cart',
  imports: [CartIconComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @ViewChild('cart') cartElement!: ElementRef;
  @ViewChild('cartIcon') cartIconElement!: ElementRef;
  isVisible: boolean = false;

  toggleCartVisibility() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.cartElement.nativeElement.classList.remove('hidden');
      this.cartIconElement.nativeElement.classList.add('bg-green-600');
    } else {
      this.cartElement.nativeElement.classList.add('hidden');
      this.cartIconElement.nativeElement.classList.remove('bg-green-600');
    }
  }
}
