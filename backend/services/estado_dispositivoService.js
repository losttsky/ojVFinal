const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarEstado(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Estado_dispositivo
     WHERE (:id IS NULL OR estado_dispositivo = :id)
     AND (:desc IS NULL OR LOWER(descripcion_dispositivo) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarEstado };
