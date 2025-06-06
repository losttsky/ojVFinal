const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarMarca(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Marca 
     WHERE (:id IS NULL OR ID_Marca = :id)
     AND (:desc IS NULL OR LOWER(Descripcion_Marca) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarMarca };
