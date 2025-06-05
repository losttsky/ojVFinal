import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-descargo-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './descargo_listado.component.html', // El HTML del componente
  styleUrls: ['./descargo_listado.component.css'], // Los estilos del componente
})
export class DescargoListadoComponent {
  // Variables para almacenar los valores ingresados en el formulario
  anioMovimiento: number = 2025;
  numMovimiento: number = 190;
  // Datos de la tabla
  datosTabla: any[] = [
    { modelo: '', fech: '', nombreEntr: '', depend: '', tecnico: '', actualizado: false },
  ];

  // Función para agregar una nueva fila en la tabla
  agregarFila() {
    this.datosTabla.push({ modelo: '', fech: '', nombreEntr: '', depend: '', tecnico: '', actualizado: false });
  }

  // Función para limpiar los campos
  limpiarCampos() {
    this.anioMovimiento = 2025;
    this.numMovimiento = 190;
    this.datosTabla = [{ modelo: '', fech: '', nombreEntr: '', depend: '', tecnico: '', actualizado: false }];
  }

  // Función para actualizar la consulta
  actualizarConsulta() {
    console.log('Consulta actualizada:', { anioMovimiento: this.anioMovimiento, numMovimiento: this.numMovimiento });
    // Aquí podrías agregar la lógica para consultar la base de datos o realizar la búsqueda
  }
}
