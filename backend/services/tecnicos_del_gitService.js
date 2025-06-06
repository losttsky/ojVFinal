const db = require('../db');

const obtenerTodos = async () => {
  const sql = `
    SELECT CORRELATIVO, DESCRIPCION
    FROM TECNICOS_DEL_GIT
    ORDER BY CORRELATIVO
  `;
  const result = await db.execute(sql, [], { outFormat: db.OBJECT });
  return result.rows;
};

module.exports = {
  obtenerTodos,
};
