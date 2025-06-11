import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntregaEquipoService } from '../../../services/entrega_equipo.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-entrega_equipo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './entrega_equipo.component.html',
  styleUrls: ['./entrega_equipo.component.css'],
})
export class EntregaEquipoComponent {
  idEntrega: string = '';
  descripcion: string = '';
  entregas: any[] = [];
  mostrarModal = false;

  constructor(private entregaService: EntregaEquipoService) {}

  buscarEntregaEquipo() {
    // Si hay hay datos los muestra, si no muestra un mensaje
    if (this.idEntrega || this.descripcion) {
      this.entregaService
        .buscar(this.idEntrega, this.descripcion)
        .subscribe((data: any) => {
          this.entregas = data;
          if (this.entregas.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron entregas de equipo con los criterios especificados.'
            );
          }
        });
    } else {
      this.entregas = [];
      alert(
        'Por favor, ingrese un ID de grupo o una descripción para buscar.'
      );
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  limpiarCampo(campo: string) {
    if (campo in this) {
      (this as any)[campo] = '';
    }
  }
}
