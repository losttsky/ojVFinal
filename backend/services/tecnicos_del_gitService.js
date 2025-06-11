const { getConnection } = require('../db');
const oracledb = require('oracledb');

const obtenerTodos = async () => {
  const conn = await getConnection();
  const sql = `
    SELECT M.NUM_MOVIMIENTO AS CORRELATIVO, T.DESCRIPCION_TECNICO AS DESCRIPCION
    FROM TB_MOVIMIENTOS_ENC M
    JOIN TB_TECNICO T ON M.TECNICO_CARGADO = T.ID_TECNICO
    WHERE M.TECNICO_CARGADO IS NOT NULL
      AND T.DESCRIPCION_TECNICO != 'Tecnico 0'
    ORDER BY M.NUM_MOVIMIENTO
  `;
  const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
  await conn.close();
  return result.rows;
};

module.exports = {
  obtenerTodos,
};
