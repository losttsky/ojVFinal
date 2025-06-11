const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function buscarTecnicos(id, descripcion) {
  const conn = await getConnection();

  const idValue = id && id.trim() !== "" ? parseInt(id) : null;
  const descPattern =
    descripcion && descripcion.trim() !== ""
      ? `%${descripcion.toLowerCase()}%`
      : null;

/*   console.log("🧪 Parámetros:", { id: idValue, descPattern }); */

  const result = await conn.execute(
    `SELECT 
       ID_TECNICO AS "codigo",
       DESCRIPCION_TECNICO AS "descripcion"
     FROM TB_TECNICO
     WHERE (:id IS NULL OR ID_TECNICO = :id)
     AND (:descPattern IS NULL OR LOWER(DESCRIPCION_TECNICO) LIKE :descPattern)`,
    {
      id: idValue,
      descPattern: descPattern,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}

module.exports = { buscarTecnicos };
