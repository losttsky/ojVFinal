const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function buscarEntrega(id, descripcion) {
  const conn = await getConnection();

  const idValue = id && id.trim() !== "" ? parseInt(id) : null;
  const descPattern =
    descripcion && descripcion.trim() !== ""
      ? `%${descripcion.toLowerCase()}%`
      : null;

  console.log("🧪 Parámetros:", { id: idValue, descPattern });

  const result = await conn.execute(
    `SELECT 
       ID_ENTREGO_A_TALLER AS "codigo",
       DESCRIPCION_ENTREGO_A_TALLER AS "descripcion"
     FROM TB_ENTREGO_A_TALLER
     WHERE (:id IS NULL OR ID_ENTREGO_A_TALLER = :id)
     AND (:descPattern IS NULL OR LOWER(DESCRIPCION_ENTREGO_A_TALLER) LIKE :descPattern)`,
    {
      id: idValue,
      descPattern: descPattern,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}

module.exports = { buscarEntrega };
