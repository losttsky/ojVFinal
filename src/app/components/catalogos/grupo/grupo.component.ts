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
    //Si hay datos los muestra en el modal, si no muestra un mensaje
    if (this.idGrupo || this.descripcion) {
      this.grupoService
        .buscar(this.idGrupo, this.descripcion)
        .subscribe((data: any) => {
          this.grupos = data;
          if (this.grupos.length > 0) {
            this.mostrarModal = true;
          } else {
            alert('No se encontraron grupos con los criterios especificados.');
          }
        });
    } else {
      this.grupos = [];
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
