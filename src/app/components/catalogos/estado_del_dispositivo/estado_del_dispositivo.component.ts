import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadoDispositivoService } from '../../../services/estado_dispositivo.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-estado_del_dispositivo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './estado_del_dispositivo.component.html',
  styleUrls: ['./estado_del_dispositivo.component.css'],
})
export class EstadoDispositivoComponent {
  idGrupo: string = '';
  descripcion: string = '';
  estados: any[] = []; // Resultados
  mostrarModal = false;

  constructor(private estadoService: EstadoDispositivoService) {}

  buscarEstadoDispositivo() {
    this.estadoService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.estados = res;
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
