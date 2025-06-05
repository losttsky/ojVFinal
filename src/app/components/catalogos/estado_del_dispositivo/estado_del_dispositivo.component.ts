import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel

@Component({
  selector: 'app-estado_del_dispositivo',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './estado_del_dispositivo.component.html', // HTML del componente
  styleUrls: ['./estado_del_dispositivo.component.css'], // Estilos del componente
})
export class EstadoDispositivoComponent {
  idGrupo: string = ''; // Variable para el ID del Grupo
  descripcion: string = ''; // Variable para la Descripción del Grupo
submenuSeleccionado: any;

  // Función para manejar la búsqueda
  buscarEstadoDispositivo() {
    console.log('Buscar grupo con:', {
      idGrupo: this.idGrupo,
      descripcion: this.descripcion,
    });
    // Aquí agregaremos la lógica para consultar la base de datos
  }

  // Función para limpiar el campo cuando se hace foco
  limpiarCampo(campo: string) {
    // Verificamos si el campo es igual a una propiedad de GrupoComponent
    if (campo in this) {
      (this as any)[campo] = ''; // Limpiamos el valor de la propiedad que coincide con el nombre del campo
    }
  }
}
