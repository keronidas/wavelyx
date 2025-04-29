import { Directive } from '@angular/core';

@Directive({
  selector: '[appRouting]',
})
export class RoutingDirective {
  constructor() {}

  rutasPagina = [
    { nombre: 'Home', url: '', icono: '' },
    {
      nombre: 'Dispositivos electrónicos',
      url: '/catalogo-electronico',
      icono: '',
    },
    {
      nombre: 'Productos biodegradables',
      url: '/productos-biodegradables',
      icono: '',
    },
    { nombre: 'Configurador electrónico', url: '/configurador', icono: '' },
  ];

  rutasIconos = [
    {
      nombre: 'Login',
      url: '/auth/login',
      icon: 'assets/icons/usuario.png',
      reqLoged: false,
    },
    {
      nombre: 'Zona usuario',
      url: '/zona-usuario',
      icon: 'assets/icons/user-interface.png',
      reqLoged: true,
    },
    // {
    //   nombre: 'Politica y privacidad',
    //   url: '/politica-privacidad',
    //   icon: 'assets/icons/politica-de-privacidad.png',
    // },
  ];
}
