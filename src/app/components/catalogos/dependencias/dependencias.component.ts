import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DependenciasService } from '../../../services/dependencias.service';

@Component({
  selector: 'app-dependencias',
  standalone: true,
  imports: [CommonModule, FormsModule, NgForOf],
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.css'],
})
export class DependenciasComponent implements OnInit {
  idDependencia: string = '';
  departamento: number | null = null;
  municipio: number | null = null;
  direccion: string = '';
  resultados: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];
  mostrarModal: boolean = false;

  constructor(private depService: DependenciasService) {}

  ngOnInit(): void {
    this.depService.getDepartamentos().subscribe({
      next: (data) => {
        console.log('Departamentos:', data); //
        this.departamentos = data;
      },
      error: (err) => console.error('Error al cargar departamentos:', err),
    });
  }

  onDepartamentoChange(): void {
    if (this.departamento) {
      this.depService.getMunicipios(this.departamento).subscribe({
        next: (data) => (this.municipios = data),
        error: (err) => console.error('Error al cargar municipios:', err),
      });
    } else {
      this.municipios = [];
    }
  }
  guardarDependencia(): void {
    const nuevaDependencia = {
      nombre: this.idDependencia,
      departamento: this.departamento,
      municipio: this.municipio,
      direccion: this.direccion,
    };

    console.log('📤 Enviando dependencia:', nuevaDependencia);

    this.depService.guardarDependencia(nuevaDependencia).subscribe({
      next: () => alert('✅ Dependencia guardada correctamente'),
      error: (err) => {
        console.error('❌ Error al guardar dependencia', err);
        alert('❌ Error al guardar dependencia');
      },
    });
  }

  buscarDependencias(): void {
    this.depService
      .buscarDependencias(this.departamento, this.municipio)
      .subscribe({
        next: (data) => {
          this.resultados = data;
          console.log('🔍 Resultados encontrados:', data);
          this.mostrarModal = true;
        },
        error: (err) => console.error('❌ Error al buscar dependencias:', err, this.mostrarModal = false),
        
      });
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
