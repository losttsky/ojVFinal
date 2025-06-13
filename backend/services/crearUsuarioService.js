const { getConnection } = require("../db");

async function crearUsuario(nombre_usuario, password, rol) {
  const conn = await getConnection();

  try {
    // 1. Obtener el último ID_TECNICO y sumarle 1
    const result = await conn.execute(
      `SELECT NVL(MAX(ID_TECNICO), 0) + 1 AS NUEVO_ID FROM TB_TECNICO`,
      [],
      { outFormat: require("oracledb").OUT_FORMAT_OBJECT }
    );

    const nuevoIdTecnico = result.rows[0].NUEVO_ID;

    // 2. Insertar en TB_TECNICO
    await conn.execute(
      `INSERT INTO TB_TECNICO (ID_TECNICO, DESCRIPCION_TECNICO)
       VALUES (:id, :descripcion)`,
      { id: nuevoIdTecnico, descripcion: nombre_usuario },
      { autoCommit: false }
    );

    // 3. Insertar en USUARIOS usando el nuevo ID
    await conn.execute(
      `INSERT INTO USUARIOS (NOMBRE_USUARIO, PASSWORD, ROL, ID_TECNICO)
       VALUES (:nombre_usuario, :password, :rol, :id_tecnico)`,
      {
        nombre_usuario,
        password,
        rol,
        id_tecnico: nuevoIdTecnico
      },
      { autoCommit: true }
    );

  } finally {
    await conn.close();
  }
}

module.exports = { crearUsuario };
