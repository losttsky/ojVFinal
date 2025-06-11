const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function buscarMedidas(id, descripcion) {
  const conn = await getConnection();

  const idValue = id && id.trim() !== "" ? parseInt(id) : null;
  const descPattern =
    descripcion && descripcion.trim() !== ""
      ? `%${descripcion.toLowerCase()}%`
      : null;

/* A */

  const result = await conn.execute(
    `SELECT 
       CODIGO_MEDIDA AS "codigo",
       DESCRIPCION_MEDIDA AS "descripcion"
     FROM TB_MEDIDAS
     WHERE (:id IS NULL OR CODIGO_MEDIDA = :id)
     AND (:descPattern IS NULL OR LOWER(DESCRIPCION_MEDIDA) LIKE :descPattern)`,
    {
      id: idValue,
      descPattern: descPattern,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}

module.exports = { buscarMedidas };
