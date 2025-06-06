const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarSubGrupo(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM TB_SUBGRUPO 
     WHERE (:id IS NULL OR ID_SUBGRUPO = :id)
     AND (:desc IS NULL OR LOWER(DESCRIPCION) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarSubGrupo };
