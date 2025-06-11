import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelosService } from '../../../services/modelos.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css'],
})
export class ModelosComponent {
  idModelo: string = '';
  descripcion: string = '';
  modelos: any[] = [];
  mostrarModal = false;

  constructor(private modelosService: ModelosService) {}

  buscarModelos() {
    // Si hay datos en el modal, los muestra, si no muestra un mensaje
    if (this.idModelo || this.descripcion) {
      this.modelosService
        .buscar(this.idModelo, this.descripcion)
        .subscribe((data: any) => {
          this.modelos = data;
          if (this.modelos.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron modelos con los criterios especificados.'
            );
          }
        });
    } else {
      this.modelos = [];
      alert('Por favor, ingrese un ID de modelo o una descripción para buscar.');
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
