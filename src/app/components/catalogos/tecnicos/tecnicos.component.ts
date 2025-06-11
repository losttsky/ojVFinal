import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { TecnicoService } from '../../../services/tecnicos.services';

@Component({
  selector: 'app-tecnicos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css'],
})
export class TecnicosComponent {
  idTecnico: string = '';
  descripcion: string = '';
  tecnicos: any[] = [];
  mostrarModal = false;

  constructor(private tecnicoService: TecnicoService) {}

  buscarTecnicos() {
    // Si hay datos los muestra, si no muestra un mensaje
    if (this.idTecnico || this.descripcion) {
      this.tecnicoService
        .buscar(this.idTecnico, this.descripcion)
        .subscribe((data: any) => {
          this.tecnicos = data;
          if (this.tecnicos.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron técnicos con los criterios especificados.'
            );
          }
        });
    } else {
      this.tecnicos = [];
      alert(
        'Por favor, ingrese un ID de técnico o una descripción para buscar.'
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
