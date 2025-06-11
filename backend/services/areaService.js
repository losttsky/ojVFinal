const { getConnection } = require("../db");
const oracledb = require("oracledb");

async function buscarArea(id, descripcion) {
  const conn = await getConnection();

  // Definir variables limpias
  const idValue = id && id.trim() !== '' ? parseInt(id) : null;
  const descPattern = descripcion && descripcion.trim() !== '' ? `%${descripcion.toLowerCase()}%` : null;

  console.log('🔍 Parámetros recibidos:', { id: idValue, descPattern });

  const result = await conn.execute(
    `SELECT * FROM Tb_area_administrativa
     WHERE (:id IS NULL OR area_administrativa = :id)
     AND (:descPattern IS NULL OR LOWER(descripcion_area_administrativa) LIKE :descPattern)`,
    {
      id: idValue,
      descPattern: descPattern,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarArea };
