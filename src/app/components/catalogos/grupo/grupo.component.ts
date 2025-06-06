import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GrupoService } from '../../../services/grupo.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css'],
})
export class GrupoComponent {
  idGrupo: string = '';
  descripcion: string = '';
  grupos: any[] = [];
  mostrarModal = false;

  constructor(private grupoService: GrupoService) {}

  buscarGrupo() {
    this.grupoService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.grupos = res;
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
