import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {

  constructor(private router: Router) { }
}