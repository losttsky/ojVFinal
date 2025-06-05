import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel

@Component({
  selector: 'app-tecnicos_del_git',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './tecnicos_del_git.component.html', // HTML del componente
  styleUrls: ['./tecnicos_del_git.component.css'], // Estilos del componente
})
export class TecnicosDelGITComponent {
  // Variables para los campos del formulario
  idGrupo: string = ''; // Correlativo
  descripcion: string = ''; // Descripción

  // Función para manejar la búsqueda (solo para demostración)
  buscarGrupo() {
    console.log('Buscar grupo con:', {
      idGrupo: this.idGrupo,
      descripcion: this.descripcion,
    });
    // Aquí agregaríamos la lógica para consultar la base de datos o hacer una solicitud HTTP
  }

  // Función para navegar al registro anterior
  anteriorRegistro() {
    console.log('Navegar al registro anterior');
    // Aquí agregaríamos la lógica para cargar el registro anterior
  }

  // Función para navegar al siguiente registro
  siguienteRegistro() {
    console.log('Navegar al siguiente registro');
    // Aquí agregaríamos la lógica para cargar el siguiente registro
  }

  // Función para limpiar el campo cuando se hace foco
  limpiarCampo(campo: string) {
    if (campo in this) {
      (this as any)[campo] = ''; // Limpiar el valor del campo
    }
  }
}
