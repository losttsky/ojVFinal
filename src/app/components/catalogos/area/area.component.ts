import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AreaService } from '../../../services/area.service';// Importa el servicio para la peticion a la base de datos
import { NgIf, NgFor } from '@angular/common'; // Para *ngIf y *ngFor

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent {
  idGrupo: string = '';
  descripcion: string = '';
  areas: any[] = []; // Lista de áreas encontradas
  mostrarModal = false; // Controla la visibilidad de la pestaña emergente

  constructor(private areaService: AreaService) {}

  buscarArea() {
    //Si hay datos los muestra en el modal, si no muestra un mensaje
    if (this.idGrupo || this.descripcion) {
      this.areaService
        .buscar(this.idGrupo, this.descripcion)
        .subscribe((data: any) => {
          this.areas = data; // Asigna los datos recibidos a la lista de áreas
          if (this.areas.length > 0) {
            this.mostrarModal = true; // Muestra el modal si hay áreas encontradas
          } else {
            alert('No se encontraron áreas con los criterios especificados.');
          }
        });
    } else {
      this.areas = []; // Limpia la lista de áreas si no hay criterios de búsqueda
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
