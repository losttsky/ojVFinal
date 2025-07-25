const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function buscarMovimientos(id, descripcion) {
  const conn = await getConnection();

  const idValue = id && id.trim() !== "" ? parseInt(id) : null;
  const descPattern =
    descripcion && descripcion.trim() !== ""
      ? `%${descripcion.toLowerCase()}%`
      : null;

  console.log("🧪 Parámetros:", { id: idValue, descPattern });

  const result = await conn.execute(
    `SELECT 
       Codigo_movimiento AS "codigo",
       Descripcion_movimiento AS "descripcion"
     FROM Tb_tipo_movimientos
     WHERE (:id IS NULL OR Codigo_movimiento = :id)
     AND (:descPattern IS NULL OR LOWER(Descripcion_movimiento) LIKE :descPattern)`,
    {
      id: idValue,
      descPattern: descPattern,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}

module.exports = { buscarMovimientos };
