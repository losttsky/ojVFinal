const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarLugarEntrega(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Lugar_Entrega
     WHERE (:id IS NULL OR Codigo_Lugar_Entrega = :id)
     AND (:desc IS NULL OR LOWER(Descripcion_Lugar_Entrega) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarLugarEntrega };
