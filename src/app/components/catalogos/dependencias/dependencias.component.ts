import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DependenciasService } from '../../../services/dependencias.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-dependencias',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.css'],
})
export class DependenciasComponent implements OnInit {
  idDependencia = '';
  departamento = '';
  municipio = '';
  direccion = '';
  observaciones = '';

  departamentos: any[] = [];
  municipios: any[] = [];

  constructor(private depService: DependenciasService) {}

  ngOnInit(): void {
    this.depService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  onDepartamentoChange() {
    if (this.departamento) {
      this.depService.getMunicipios(this.departamento).subscribe((data) => {
        this.municipios = data;
      });
    } else {
      this.municipios = [];
    }
  }

  guardarDependencia() {
    const nuevaDependencia = {
      nombre: this.idDependencia,
      departamento: this.departamento,
      municipio: this.municipio,
      direccion: this.direccion,
    };

    this.depService.guardarDependencia(nuevaDependencia).subscribe({
      next: () => alert('✅ Dependencia guardada correctamente'),
      error: () => alert('❌ Error al guardar dependencia'),
    });
  }
}
