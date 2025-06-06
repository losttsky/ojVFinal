const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarMedidas(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Medidas 
     WHERE (:id IS NULL OR ID_MEDIDA = :id)
     AND (:desc IS NULL OR LOWER(DESCRIPCION_MEDIDA) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarMedidas };
