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
  idGrupo: string = '';
  descripcion: string = '';
  marcas: any[] = [];
  mostrarModal = false;

  constructor(private marcaService: MarcaService) {}

  buscarMarca() {
    this.marcaService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.marcas = res;
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
