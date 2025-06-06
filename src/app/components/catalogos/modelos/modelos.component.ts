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
  idGrupo: string = '';
  descripcion: string = '';
  modelos: any[] = [];
  mostrarModal = false;

  constructor(private modelosService: ModelosService) {}

  buscarModelos() {
    this.modelosService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.modelos = res;
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
