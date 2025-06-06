const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarEntrega(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_entrego_a_taller
     WHERE (:id IS NULL OR id_entrego_a_taller = :id)
     AND (:desc IS NULL OR LOWER(Descripcion_entrego_a_taller) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarEntrega };
