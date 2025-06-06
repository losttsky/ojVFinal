// backend/services/areaService.js
const { getConnection } = require('../db');

async function buscarArea(id, descripcion) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT * FROM Tb_Area_administrativa 
     WHERE (:id IS NULL OR Area_administrativa = :id)
     AND (:desc IS NULL OR LOWER(Descripcion_area_administrativa) LIKE '%' || LOWER(:desc) || '%')`,
    {
      id: id || null,
      desc: descripcion || null,
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

module.exports = { buscarArea };
