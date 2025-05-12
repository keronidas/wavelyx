import { Component } from '@angular/core';
import { ImageCompareModule } from 'primeng/imagecompare';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ImageCompareModule],
  styleUrl: './catalogo.component.css',
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent {
  constructor() {}
}
