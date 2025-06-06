const { getConnection } = require('../db');
const oracledb = require('oracledb');

// Obtener todos los departamentos
async function obtenerDepartamentos() {
  const conn = await getConnection();
  const result = await conn.execute('SELECT departamento, nombreDepartamento FROM departamentos', [], {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  });
  await conn.close();
  return result.rows;
}

// Obtener municipios por departamento
async function obtenerMunicipios(departamento) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT municipio, nombreMunicipio FROM municipios WHERE departamento = :dep`,
    { dep: departamento },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

// Guardar nueva dependencia
async function guardarDependencia(nombre, departamento, municipio, direccion) {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO catDependencias 
     (DEPENDENCIA, NOMBRE_DEPENDENCIA, DEPARTAMENTO, MUNICIPIO, DIRECCION)
     VALUES (catDependencias_seq.NEXTVAL, :nombre, :departamento, :municipio, :direccion)`,
    { nombre, departamento, municipio, direccion },
    { autoCommit: true }
  );
  await conn.close();
}

module.exports = {
  obtenerDepartamentos,
  obtenerMunicipios,
  guardarDependencia,
};
