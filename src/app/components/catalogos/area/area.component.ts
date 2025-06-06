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
    this.areaService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.areas = res;
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
