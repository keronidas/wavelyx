import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CartComponent } from "../../components/cart/cart.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, CartComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
