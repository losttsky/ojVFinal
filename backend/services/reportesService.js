const oracledb = require("oracledb");
const { getConnection } = require("../db");

async function obtenerReportesResponsabilidad(fechaInicio, fechaFin) {
  console.log("📅 Fechas recibidas en backend:", fechaInicio, fechaFin);
  const conn = await getConnection();
  try {
    const enc = await conn.execute(
      `SELECT 
    e.año_movimiento,
    e.num_movimiento,
    TO_CHAR(e.fecha_operacion, 'YYYY-MM-DD') AS fecha,
    e.dependencia,
    d."nombreDepartamento" AS departamento,
    m.NOMBREMUNICIPIO AS municipio,
    t.DESCRIPCION_TECNICO AS tecnico,
    e.usuario_recibio AS persona_entrega,
    e.nombre_descargo,
    e.lugar_descargo
   FROM Tb_Movimientos_Enc e
   LEFT JOIN DEPARTAMENTOS d ON d.DEPARTAMENTO = e.DEPARTAMENTO
   LEFT JOIN MUNICIPIOS m ON m.MUNICIPIO = e.MUNICIPIO
   LEFT JOIN TB_TECNICO t ON t.ID_TECNICO = e.TECNICO_ENTREGO
   WHERE e.fecha_operacion BETWEEN TO_DATE(:inicio, 'YYYY-MM-DD') AND TO_DATE(:fin, 'YYYY-MM-DD')`,
      { inicio: fechaInicio, fin: fechaFin },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const resultados = [];
    for (const row of enc.rows) {
      const detalles = await conn.execute(
        `SELECT 
    a.descripcion_articulo AS inventario, 
    d.cantidad, 
    a.descripcion_articulo AS dispositivo,
    a.marca, 
    a.modelo, 
    a.serie
   FROM Tb_Movimientos_Det d
   JOIN Tb_Articulos a 
     ON a.codigo_articulo = d.codigo_articulo 
     AND a.codigo_grupo = d.codigo_grupo 
     AND a.codigo_subgrupo = d.codigo_subgrupo
   WHERE d.año_movimiento = :año AND d.num_movimiento = :num`,
        { año: row.AÑO_MOVIMIENTO, num: row.NUM_MOVIMIENTO },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      const rowData = Object.fromEntries(
        Object.entries(row).map(([k, v]) => [k.toLowerCase(), v])
      );
      const detalleData = detalles.rows.map((a) =>
        Object.fromEntries(
          Object.entries(a).map(([k, v]) => [k.toLowerCase(), v])
        )
      );

      resultados.push({
        ...rowData,
        referencia: `${rowData.num_movimiento}-${rowData.año_movimiento}`,
        articulos: detalleData,
      });
    }

    return resultados;
  } finally {
    await conn.close();
  }
}

async function obtenerPorSerie(serie) {
  const conn = await getConnection();

  try {
    const enc = await conn.execute(
      `SELECT 
        e.año_movimiento,
        e.num_movimiento,
        TO_CHAR(e.fecha_operacion, 'YYYY-MM-DD') AS fecha,
        e.dependencia,
        dept."nombreDepartamento" AS departamento,
        m.NOMBREMUNICIPIO AS municipio,
        t.DESCRIPCION_TECNICO AS tecnico,
        e.usuario_recibio AS persona_entrega,
        e.nombre_descargo,
        e.lugar_descargo
       FROM Tb_Movimientos_Enc e
       JOIN Tb_Movimientos_Det d ON d.año_movimiento = e.año_movimiento AND d.num_movimiento = e.num_movimiento
       JOIN Tb_Articulos a ON a.codigo_articulo = d.codigo_articulo AND a.codigo_grupo = d.codigo_grupo AND a.codigo_subgrupo = d.codigo_subgrupo
       LEFT JOIN DEPARTAMENTOS dept ON dept.DEPARTAMENTO = e.DEPARTAMENTO
       LEFT JOIN MUNICIPIOS m ON m.MUNICIPIO = e.MUNICIPIO
       LEFT JOIN TB_TECNICO t ON t.ID_TECNICO = e.TECNICO_ENTREGO
       WHERE a.serie = :serie`,
      { serie },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (enc.rows.length === 0) return [];

    const row = enc.rows[0];

    const detalles = await conn.execute(
      `SELECT 
        a.descripcion_articulo AS inventario,
        d.cantidad,
        a.descripcion_articulo AS dispositivo,
        a.marca,
        a.modelo,
        a.serie
       FROM Tb_Movimientos_Det d
       JOIN Tb_Articulos a ON a.codigo_articulo = d.codigo_articulo AND a.codigo_grupo = d.codigo_grupo AND a.codigo_subgrupo = d.codigo_subgrupo
       WHERE d.año_movimiento = :año AND d.num_movimiento = :num AND a.serie = :serie`,
      { año: row.AÑO_MOVIMIENTO, num: row.NUM_MOVIMIENTO, serie },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const rowData = Object.fromEntries(
      Object.entries(row).map(([k, v]) => [k.toLowerCase(), v])
    );
    const detalleData = detalles.rows.map((a) =>
      Object.fromEntries(
        Object.entries(a).map(([k, v]) => [k.toLowerCase(), v])
      )
    );

    return [
      {
        ...rowData,
        referencia: `${rowData.num_movimiento}-${rowData.año_movimiento}`,
        articulos: detalleData,
      },
    ];
  } finally {
    await conn.close();
  }
}

module.exports = { obtenerReportesResponsabilidad, obtenerPorSerie };
