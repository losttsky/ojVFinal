const oracledb = require("oracledb");
const { getConnection } = require("../db");

// Buscar artículos asociados al técnico
async function obtenerArticulosPorMovimiento(anio, numero) {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `SELECT
    a.descripcion_articulo AS "inventario",
    d.cantidad AS "cant",
    a.marca AS "marca",
    a.modelo AS "modelo",
    a.serie AS "serie",
    a.descripcion_articulo as "dispositivo",
    d."ITEM_MOVIMIENTO" AS "itemMovimiento",
    d."NOMBRE_RECIBE_EQUIPO" AS "tecnico",
    CASE WHEN d."TECNICO_ENTREGO_DISPOSITIVO" IS NULL THEN 1 ELSE 0 END AS "actualizado"
  FROM TB_MOVIMIENTOS_DET d
  JOIN TB_ARTICULOS a 
    ON a.codigo_articulo = d.codigo_articulo 
   AND a.codigo_grupo = d.codigo_grupo 
   AND a.codigo_subgrupo = d.codigo_subgrupo
  WHERE d."AÑO_MOVIMIENTO" = :anio AND d."NUM_MOVIMIENTO" = :numero`,
      { anio, numero },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows;
  } finally {
    await connection.close();
  }
}

// Desligar artículos seleccionados
async function desligarArticulos(anio, numero, articulos) {
  const connection = await getConnection();

  try {
    for (const art of articulos) {
      if (art.actualizado) {
        await connection.execute(
          `UPDATE TB_MOVIMIENTOS_DET
           SET tecnico_entrego_dispositivo = NULL
           WHERE "AÑO_MOVIMIENTO" = :anio
             AND "NUM_MOVIMIENTO" = :numero
             AND "ITEM_MOVIMIENTO" = :item`,
          {
            anio,
            numero,
            item: art.itemMovimiento,
          }
        );
      }
    }
    await connection.commit();
  } finally {
    await connection.close();
  }
}

async function obtenerUltimoMovimiento() {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `SELECT "AÑO_MOVIMIENTO", "NUM_MOVIMIENTO"
       FROM TB_MOVIMIENTOS_DET
       ORDER BY "AÑO_MOVIMIENTO" DESC, "NUM_MOVIMIENTO" DESC FETCH FIRST 1 ROWS ONLY`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows.length ? result.rows[0] : null;
  } finally {
    await connection.close();
  }
}

module.exports = {
  obtenerArticulosPorMovimiento,
  desligarArticulos,
  obtenerUltimoMovimiento, // 👈 añadimos esto
};

module.exports = {
  obtenerArticulosPorMovimiento,
  desligarArticulos,
  obtenerUltimoMovimiento, // Añadimos esta función para obtener el último movimiento
};
