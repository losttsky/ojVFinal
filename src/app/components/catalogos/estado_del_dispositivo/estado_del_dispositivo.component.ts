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
  idEstado: string = '';
  descripcion: string = '';
  estados: any[] = []; // Resultados
  mostrarModal = false;

  constructor(private estadoService: EstadoDispositivoService) {}

  buscarEstadoDispositivo() {
    // Si hay datos los muestra, si no muestra un mensaje
    if (this.idEstado || this.descripcion) {
      this.estadoService
        .buscar(this.idEstado, this.descripcion)
        .subscribe((data: any) => {
          this.estados = data;
          if (this.estados.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron estados de dispositivo con los criterios especificados.'
            );
          }
        });
    } else {
      this.estados = [];
      alert(
        'Por favor, ingrese un ID de estado o una descripción para buscar.'
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
