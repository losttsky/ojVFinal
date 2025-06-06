const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarModelos(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Modelo 
     WHERE (:id IS NULL OR ID_Modelo = :id)
     AND (:desc IS NULL OR LOWER(Descripcion_Modelo) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarModelos };
