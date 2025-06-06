const oracledb = require("oracledb");
const dbConfig = require("../db");

async function obtenerReportesResponsabilidad(fechaInicio, fechaFin) {
  const conn = await oracledb.getConnection(dbConfig);
  try {
    const enc = await conn.execute(
      `SELECT 
        anio_movimiento, num_movimiento, TO_CHAR(fecha_operacion, 'YYYY-MM-DD') AS fecha,
        dependencia, departamento, municipio, tecnico_entrego AS tecnico,
        usuario_recibio AS persona_entrega
       FROM Tb_Movimientos_Enc
       WHERE fecha_operacion BETWEEN TO_DATE(:inicio, 'YYYY-MM-DD') AND TO_DATE(:fin, 'YYYY-MM-DD')`,
      { inicio: fechaInicio, fin: fechaFin },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const resultados = [];
    for (const row of enc.rows) {
      const detalles = await conn.execute(
        `SELECT 
          descripcion AS inventario, cantidad, descripcion AS dispositivo,
          marca, modelo, serie
         FROM Tb_Movimientos_Det d
         JOIN Tb_Articulos a ON a.codigo_articulo = d.codigo_articulo AND a.codigo_grupo = d.codigo_grupo AND a.codigo_subgrupo = d.codigo_subgrupo
         WHERE d.anio_movimiento = :anio AND d.num_movimiento = :num`,
        { anio: row.ANIO_MOVIMIENTO, num: row.NUM_MOVIMIENTO },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      resultados.push({
        ...row,
        referencia: `${row.NUM_MOVIMIENTO}-${row.ANIO_MOVIMIENTO}`,
        articulos: detalles.rows,
      });
    }

    return resultados;
  } finally {
    await conn.close();
  }
}

async function obtenerPorSerie(serie) {
  const conn = await oracledb.getConnection(dbConfig);

  try {
    const enc = await conn.execute(
      `SELECT 
        e.anio_movimiento, e.num_movimiento, TO_CHAR(e.fecha_operacion, 'YYYY-MM-DD') AS fecha,
        e.dependencia, e.departamento, e.municipio, e.tecnico_entrego AS tecnico,
        e.usuario_recibio AS persona_entrega
       FROM Tb_Movimientos_Enc e
       JOIN Tb_Movimientos_Det d ON d.anio_movimiento = e.anio_movimiento AND d.num_movimiento = e.num_movimiento
       JOIN Tb_Articulos a ON a.codigo_articulo = d.codigo_articulo AND a.codigo_grupo = d.codigo_grupo AND a.codigo_subgrupo = d.codigo_subgrupo
       WHERE a.serie = :serie`,
      { serie },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (enc.rows.length === 0) return [];

    const row = enc.rows[0];

    const detalles = await conn.execute(
      `SELECT 
        descripcion AS inventario, cantidad, descripcion AS dispositivo,
        marca, modelo, serie
       FROM Tb_Movimientos_Det d
       JOIN Tb_Articulos a ON a.codigo_articulo = d.codigo_articulo AND a.codigo_grupo = d.codigo_grupo AND a.codigo_subgrupo = d.codigo_subgrupo
       WHERE d.anio_movimiento = :anio AND d.num_movimiento = :num AND a.serie = :serie`,
      { anio: row.ANIO_MOVIMIENTO, num: row.NUM_MOVIMIENTO, serie },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return [
      {
        ...row,
        referencia: `${row.NUM_MOVIMIENTO}-${row.ANIO_MOVIMIENTO}`,
        articulos: detalles.rows,
      },
    ];
  } finally {
    await conn.close();
  }
}

module.exports = { obtenerReportesResponsabilidad, obtenerPorSerie };
