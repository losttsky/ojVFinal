import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LugarEntregaService } from '../../../services/lugar_de_entrega.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-lugar_de_entrega',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './lugar_de_entrega.component.html',
  styleUrls: ['./lugar_de_entrega.component.css'],
})
export class LugarEntregaComponent {
  idGrupo: string = '';
  descripcion: string = '';
  lugares: any[] = [];
  mostrarModal = false;

  constructor(private lugarService: LugarEntregaService) {}

  buscarLugarEntrega() {
    this.lugarService.buscar(this.idGrupo, this.descripcion).subscribe((res) => {
      this.lugares = res;
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
