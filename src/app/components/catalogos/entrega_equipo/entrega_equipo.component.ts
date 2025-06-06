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
  idGrupo: string = '';
  descripcion: string = '';
  entregas: any[] = [];
  mostrarModal = false;

  constructor(private entregaService: EntregaEquipoService) {}

  buscarEntregaEquipo() {
    this.entregaService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.entregas = res;
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
