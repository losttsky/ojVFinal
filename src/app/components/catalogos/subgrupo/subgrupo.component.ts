import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { SubGrupoService } from '../../../services/subgrupo.services';

@Component({
  selector: 'app-subgrupo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subgrupo.component.html',
  styleUrls: ['./subgrupo.component.css'],
})
export class SubGrupoComponent {
  idGrupo: string = '';
  descripcion: string = '';
  submenuSeleccionado: any;
  subgrupos: any[] = [];
  mostrarModal = false;

  constructor(private subGrupoService: SubGrupoService) {}

  buscarSubGrupo() {
    this.subGrupoService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.subgrupos = res;
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
