import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { TecnicosService } from '../../../services/tecnicos.services';

@Component({
  selector: 'app-tecnicos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css'],
})
export class TecnicosComponent {
  idGrupo: string = '';
  descripcion: string = '';
  tecnicos: any[] = [];
  mostrarModal = false;

  constructor(private tecnicosService: TecnicosService) {}

  buscarTecnicos() {
    this.tecnicosService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.tecnicos = res;
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
