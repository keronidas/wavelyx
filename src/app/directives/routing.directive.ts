import { Directive } from '@angular/core';

@Directive({
  selector: '[appRouting]',
})
export class RoutingDirective {
  constructor() {}
  
  rutasPagina = [
    { nombre: 'Home', url: '', icono: '' },
    { nombre: 'Catalogo', url: '/catalogo', icono: '' },
    { nombre: 'Configurador', url: '/configurador', icono: '' },
    { nombre: 'Politica y privacidad', url: '/politica-privacidad', icono: '' },
    { nombre: 'Zona usuarios', url: '/zona-usuarios', icono: '' },
  ];
}
