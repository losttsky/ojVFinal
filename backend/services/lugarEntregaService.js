const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function buscarLugarEntrega(id, descripcion) {
  const conn = await getConnection();

  const idValue = id && id.trim() !== "" ? parseInt(id) : null;
  const descPattern =
    descripcion && descripcion.trim() !== ""
      ? `%${descripcion.toLowerCase()}%`
      : null;

/*   console.log("🧪 Parámetros:", { id: idValue, descPattern }); */

  const result = await conn.execute(
    `SELECT 
       ID_LUGAR_ENTREGA AS "codigo",
       DESCRIPCION_LUGAR_ENTREGA AS "descripcion"
     FROM TB_LUGAR_ENTREGA
     WHERE (:id IS NULL OR ID_LUGAR_ENTREGA = :id)
     AND (:descPattern IS NULL OR LOWER(DESCRIPCION_LUGAR_ENTREGA) LIKE :descPattern)`,
    {
      id: idValue,
      descPattern: descPattern,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}

module.exports = { buscarLugarEntrega };
