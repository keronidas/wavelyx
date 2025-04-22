import { Component, inject, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-empleados',
  imports: [FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss',
  providers: [EmpleadoService],
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';
  private empleadoService = inject(EmpleadoService);

  constructor() {}

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar empleados';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  get empleadosFiltrados(): any[] {
    const term = this.searchTerm.toLowerCase();
    return this.empleados.filter(
      (emp) =>
        emp.nombre.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
    );
  }
}

