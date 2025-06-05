import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel

@Component({
  selector: 'app-dependencias',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './dependencias.component.html', // HTML del componente
  styleUrls: ['./dependencias.component.css'], // Estilos del componente
})
export class DependenciasComponent {
  // Variables para los campos del formulario
  idDependencia: string = ''; // ID de la dependencia
  departamento: string = ''; // Departamento
  municipio: string = ''; // Municipio
  direccion: string = ''; // Dirección
  observaciones: string = ''; // Observaciones

  // Lista de departamentos y municipios (para los select)
  departamentos: string[] = [
    'Alta Verapaz',
    'Baja Verapaz',
    'Chimaltenango',
    'Chiquimula',
    'El Progreso',
    'Escuintla',
    'Guatemala',
    'Huehuetenango',
    'Izabal',
    'Jalapa',
    'Jutiapa',
    'Petén',
    'Quetzaltenango',
    'Quiché',
    'Retalhuleu',
    'Sacatepéquez',
    'San Marcos',
    'Santa Rosa',
    'Solalá',
    'Suchitepéquez',
    'Totonicapán',
    'Zacapa',
  ];
  // Objeto que contiene los municipios por departamento
  municipiosPorDepartamento: { [key: string]: string[] } = {
    'Alta Verapaz': [
      'Chahal',
      'Chisec',
      'Cobán',
      'Fray Bartolomé de las Casas',
      'La Tinta',
      'Lanquín',
      'Panzos',
      'Raxruhá',
      'San Cristóbal Verapaz',
      'San Juan Chamelco',
      'San Pedro Carchá',
      'Cahabón',
      'Senahú',
      'Tamahú',
      'Tactic',
      'Tucurú',
    ],
    'Baja Verapaz': [
      'Cubulco',
      'Granados',
      'Purulhá',
      'Rabinal',
      'Salamá',
      'San Jerónimo',
      'San Miguel Chicaj',
      'Santa Cruz El Chol',
    ],
    Chimaltenango: [
      'Acatenango',
      'Chimaltenango',
      'El Tejar',
      'Pazrramos',
      'Patzicía',
      'Patzún',
      'Pochuta',
      'San Andrés Itzapa',
      'San José Poaquil',
      'San Juan Comalapa',
      'San Martín Jilotepeque',
      'San Pedro Yepocapa',
    ],
    Chiquimula: [
      'Chiquimula',
      'San Juan Ermita',
      'Olopa',
      'Concepción Las Minas',
      'Esquipulas',
      'Camotán',
      'Jocotán',
      'Quezaltepeque',
    ]
  };

  // Variable para almacenar los municipios que corresponden al departamento seleccionado
  municipios: string[] = [];

  // Función que se llama cuando se selecciona un departamento
  onDepartamentoChange() {
    // Actualiza la lista de municipios según el departamento seleccionado
    this.municipios = this.municipiosPorDepartamento[this.departamento] || [];
    this.municipio = ''; // Resetea el municipio cuando cambia el departamento
  }

  // Función para manejar la búsqueda (solo para demostración)
  buscarDependencia() {
    console.log('Buscar dependencia con:', {
      idDependencia: this.idDependencia,
      departamento: this.departamento,
      municipio: this.municipio,
      direccion: this.direccion,
      observaciones: this.observaciones,
    });
    // Aquí agregaríamos la lógica para consultar la base de datos o hacer una solicitud HTTP
  }

  //Funcion para guardar la dependecia
  guardarDependencia() {
    console.log('Guardar dependencia con:', {
      idDependencia: this.idDependencia,
      departamento: this.departamento,
      municipio: this.municipio,
      direccion: this.direccion,
      observaciones: this.observaciones,
    });
    // Aquí agregaríamos la lógica para guardar la dependencia en la base de datos
  }

  // Función para limpiar el campo cuando se hace foco
  limpiarCampo(campo: string) {
    if (campo in this) {
      (this as any)[campo] = ''; // Limpiar el valor del campo
    }
  }
}
