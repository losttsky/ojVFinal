import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MarcaService } from '../../../services/marca.services';

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
})
export class MarcaComponent {
  idMarca: string = '';
  descripcion: string = '';
  marcas: any[] = [];
  mostrarModal = false;

  constructor(private marcaService: MarcaService) {}

  buscarMarca() {
    //Si hay datos en el modal, los muestra, si no muestra un mensaje
    if (this.idMarca || this.descripcion) {
      this.marcaService
        .buscar(this.idMarca, this.descripcion)
        .subscribe((data: any) => {
          this.marcas = data;
          if (this.marcas.length > 0) {
            this.mostrarModal = true;
          } else {
            alert(
              'No se encontraron marcas con los criterios especificados.'
            );
          }
        });
    } else {
      this.marcas = [];
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
