import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnicosDelGITService } from '../../../services/tecnicos_del_git.service'; // Asegúrate de tenerlo

@Component({
  selector: 'app-tecnicos-del-git',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tecnicos_del_git.component.html',
  styleUrls: ['./tecnicos_del_git.component.css'],
  providers: [TecnicosDelGITService],
})
export class TecnicosDelGITComponent implements OnInit {
  tecnicos: any[] = [];
  indiceActual: number = 0;
  mostrarModal: boolean = false;

  idGrupo: string = '';
  descripcion: string = '';

  constructor(private service: TecnicosDelGITService) {}

  ngOnInit() {
    this.service.obtenerTodos().subscribe((res) => {
      this.tecnicos = res;
    });
  }

  mostrarDatos(indice: number) {
    const tecnico = this.tecnicos[indice];
    this.idGrupo = tecnico.CORRELATIVO; // ← es el número de movimiento
    this.descripcion = tecnico.DESCRIPCION;
  }

  anteriorRegistro() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.mostrarDatos(this.indiceActual);
    }
  }

  siguienteRegistro() {
    if (this.indiceActual < this.tecnicos.length - 1) {
      this.indiceActual++;
      this.mostrarDatos(this.indiceActual);
    }
  }

  buscarGrupo() {
    const idBuscado = String(this.idGrupo).trim();

    const encontrado = this.tecnicos.findIndex(
      (t) => String(t.CORRELATIVO) === idBuscado
    );

    if (encontrado !== -1) {
      this.indiceActual = encontrado;
      this.mostrarDatos(encontrado);
      this.mostrarModal = true;
    } else {
      this.descripcion = '';
      this.mostrarModal = false;
      alert('Técnico no encontrado');
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
