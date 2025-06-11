const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function obtenerDepartamentos() {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT DEPARTAMENTO, "nombreDepartamento" FROM DEPARTAMENTOS`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

async function obtenerMunicipios(departamento) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT MUNICIPIO, NOMBREMUNICIPIO FROM MUNICIPIOS WHERE DEPARTAMENTO = :dep`,
    { dep: departamento },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

async function guardarDependencia(nombre, departamento, municipio, direccion) {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO catDependencias 
   (DEPENDENCIA, NOMBRE_DEPENDENCIA, DEPARTAMENTO, MUNICIPIO, DIRECCION)
   VALUES (catDependencias_seq.NEXTVAL, :nombre, :departamento, :municipio, :direccion)`,
    { nombre, departamento, municipio, direccion },
    { autoCommit: true }
  );
  console.log("Dependencia guardada correctamente");
  await conn.close();
}

async function buscarDependencias(departamento, municipio) {
  const conn = await getConnection();
  const condiciones = [];
  const parametros = {};

  if (departamento) {
    condiciones.push("DEPARTAMENTO = :departamento");
    parametros.departamento = departamento;
  }

  if (municipio) {
    condiciones.push("MUNICIPIO = :municipio");
    parametros.municipio = municipio;
  }

  const where = condiciones.length ? "WHERE " + condiciones.join(" AND ") : "";

  const result = await conn.execute(
    `SELECT DEPENDENCIA, NOMBRE_DEPENDENCIA, DEPARTAMENTO, MUNICIPIO, DIRECCION FROM catDependencias ${where}`,
    parametros,
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}


module.exports = {
  obtenerDepartamentos,
  obtenerMunicipios,
  guardarDependencia,
  buscarDependencias
};
