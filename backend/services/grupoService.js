const { getConnection } = require('../db');
const oracledb = require('oracledb');

async function buscarGrupo(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Grupos
     WHERE (:id IS NULL OR Codigo_Grupo = :id)
     AND (:desc IS NULL OR LOWER(Descripcion_Grupo) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarGrupo };
