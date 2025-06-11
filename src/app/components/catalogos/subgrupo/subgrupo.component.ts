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
    //Si hay datos los muestra en el modal, si no muestra un mensaje
    if (this.idGrupo || this.descripcion) {
      this.subGrupoService
        .buscar(this.idGrupo, this.descripcion)
        .subscribe((data: any) => {
          this.subgrupos = data;
          if (this.subgrupos.length > 0) {
            this.mostrarModal = true;
          } else {
            alert('No se encontraron subgrupos con los criterios especificados.');
          }
        });
    } else {
      this.subgrupos = [];
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
