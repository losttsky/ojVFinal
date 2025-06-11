import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MedidasService } from '../../../services/medidas.service';

@Component({
  selector: 'app-medidas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.css'],
})
export class MedidasComponent {
  idMedidas: string = '';
  descripcion: string = '';
  medidas: any[] = [];
  mostrarModal = false;

  constructor(private medidasService: MedidasService) {}

  buscarMedidas() {
    // Si hay datos en el modal, los muestra, si no muestra un mensaje
    if (this.idMedidas || this.descripcion) {
      this.medidasService
        .buscar(this.idMedidas, this.descripcion)
        .subscribe((data: any) => {
          this.medidas = data;
          if (this.medidas.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron medidas con los criterios especificados.'
            );
          }
        });
    } else {
      this.medidas = [];
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
