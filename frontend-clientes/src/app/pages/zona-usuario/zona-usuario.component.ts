import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zona-usuario',
  standalone: true,
  templateUrl: './zona-usuario.component.html',
  imports: [CommonModule],
})
export class ZonaUsuarioComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private pedidoService = inject(PedidoService);

  userPedidos: any[] = [];

  ngOnInit(): void {

    const currentUser = localStorage.getItem('currentUser');
    const usuarioId = currentUser ? JSON.parse(currentUser).id : null;

    if (usuarioId) {
      this.pedidoService.getPedidosByUserId(usuarioId).subscribe({
        next: (pedidos) => {
          console.log('Pedidos recibidos:', pedidos);  // <-- aquí el console.log
          this.userPedidos = pedidos;
        },
        error: (error) => {
          console.error('Error al obtener los pedidos del usuario', error);
        },
      })
    } else {
      console.error('Usuario no encontrado en el localStorage');
    }
  }

  exit() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
