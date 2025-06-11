const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function buscarEstado(id, descripcion) {
  const conn = await getConnection();

  const idValue = id && id.trim() !== "" ? parseInt(id) : null;
  const descPattern =
    descripcion && descripcion.trim() !== ""
      ? `%${descripcion.toLowerCase()}%`
      : null;

  console.log("🧪 Parámetros:", { id: idValue, descPattern });

  const result = await conn.execute(
    `SELECT 
       ESTADO_DISPOSITIVO AS "codigo",
       DESCRIPCION_DISPOSITIVO AS "descripcion"
     FROM TB_ESTADO_DISPOSITIVO
     WHERE (:id IS NULL OR ESTADO_DISPOSITIVO = :id)
     AND (:descPattern IS NULL OR LOWER(DESCRIPCION_DISPOSITIVO) LIKE :descPattern)`,
    {
      id: idValue,
      descPattern: descPattern,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}

module.exports = { buscarEstado };
