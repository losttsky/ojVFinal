const oracledb = require('oracledb');
const dbConfig = require('../db');

// Buscar artículos asociados al técnico
async function obtenerArticulosPorMovimiento(anio, numero) {
  const connection = await oracledb.getConnection(dbConfig);

  try {
    const result = await connection.execute(
      `SELECT
         d.descripcion AS "inventario",
         d.cantidad AS "cant",
         d.descripcion AS "dispositivo",
         a.marca AS "marca",
         a.modelo AS "modelo",
         a.serie AS "serie",
         d.item_movimiento AS "item"
       FROM Tb_Movimientos_Det d
       JOIN Tb_Articulos a ON a.codigo_articulo = d.codigo_articulo AND a.codigo_grupo = d.codigo_grupo AND a.codigo_subgrupo = d.codigo_subgrupo
       WHERE d.anio_movimiento = :anio AND d.num_movimiento = :numero`,
      { anio, numero },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // Devuelve los artículos con un campo adicional para el checkbox
    return result.rows.map(row => ({ ...row, actualizado: false }));
  } finally {
    await connection.close();
  }
}

// Desligar (actualizar) los artículos seleccionados
async function desligarArticulos(anio, numero, articulos) {
  const connection = await oracledb.getConnection(dbConfig);
  try {
    for (const art of articulos) {
      if (art.actualizado) {
        await connection.execute(
          `UPDATE Tb_Movimientos_Det
           SET tecnico_entrego_dispositivo = NULL
           WHERE anio_movimiento = :anio AND num_movimiento = :numero AND item_movimiento = :item`,
          {
            anio,
            numero,
            item: art.item
          }
        );
      }
    }
    await connection.commit();
  } finally {
    await connection.close();
  }
}

module.exports = {
  obtenerArticulosPorMovimiento,
  desligarArticulos
};
