const { getConnection } = require("../db");

async function validarUsuario(username, password) {
  const conn = await getConnection();

  console.log("🧪 Validando usuario:", username, password); // 👈

  try {
    const result = await conn.execute(
      `SELECT u.NOMBRE_USUARIO, t.DESCRIPCION_TECNICO
   FROM USUARIOS u
   JOIN TB_TECNICO T ON u.ID_TECNICO = t.ID_TECNICO
   WHERE LOWER(u.NOMBRE_USUARIO) = LOWER(:username)
     AND u.PASSWORD = :password`,
      { username, password },
      { outFormat: require("oracledb").OUT_FORMAT_OBJECT }
    );

    console.log("📦 Resultado de búsqueda:", result.rows); // 👈

    return result.rows.length > 0 ? result.rows[0] : null;
  } finally {
    await conn.close();
  }
}

module.exports = { validarUsuario };
