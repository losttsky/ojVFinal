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
    this.movimientosService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.movimientos = res;
      this.mostrarModal = true;
    });
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
