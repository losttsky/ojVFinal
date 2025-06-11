import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovimientosService } from '../../../services/movimientos.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
})
export class MovimientosComponent {
  idGrupo: string = '';
  descripcion: string = '';
  movimientos: any[] = [];
  mostrarModal = false;

  constructor(private movimientosService: MovimientosService) {}

  buscarMovimientos() {
    //Si hay datos los muestra en el modal, si no muestra un mensaje
    if (this.idGrupo || this.descripcion) {
      this.movimientosService
        .buscar(this.idGrupo, this.descripcion)
        .subscribe((data: any) => {
          this.movimientos = data;
          if (this.movimientos.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron movimientos con los criterios especificados.'
            );
          }
        });
    } else {
      this.movimientos = [];
      alert('Por favor, ingrese un ID de grupo o una descripción para buscar.');
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
