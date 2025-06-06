import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MedidasService } from '../../../services/medidas.service';

@Component({
  selector: 'app-medidas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.css'],
})
export class MedidasComponent {
  idGrupo: string = '';
  descripcion: string = '';
  medidas: any[] = [];
  mostrarModal = false;

  constructor(private medidasService: MedidasService) {}

  buscarMedidas() {
    this.medidasService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.medidas = res;
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
