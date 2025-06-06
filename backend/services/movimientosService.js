const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarMovimientos(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Movimientos 
     WHERE (:id IS NULL OR id_movimiento = :id)
     AND (:desc IS NULL OR LOWER(descripcion) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarMovimientos };
