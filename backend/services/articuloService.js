const { getConnection } = require("../db");
const oracledb = require("oracledb");

exports.getUltimoCodigoArticulo = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT NVL(MAX(CODIGO_ARTICULO), 0) + 1 AS nuevo_codigo FROM TB_ARTICULOS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows[0]); // Devuelve un objeto con "nuevo_codigo"
  } catch (error) {
    console.error("Error al obtener último código:", error);
    res.status(500).json({ error: "Error al obtener último código" });
  }
};

exports.getGrupos = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT CODIGO_GRUPO as id_grupo, DESCRIPCION_GRUPO as descripcion FROM TB_GRUPOS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener grupos:", error);
    res.status(500).json({ error: "Error al obtener grupos" });
  }
};

exports.getSubgrupos = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT CODIGO_SUBGRUPO as id_subgrupo, DESCRIPCION_SUBGRUPO as descripcion FROM TB_SUBGRUPOS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener subgrupos:", error);
    res.status(500).json({ error: "Error al obtener subgrupos" });
  }
};

exports.getMedidas = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT CODIGO_MEDIDA as id_medida, DESCRIPCION_MEDIDA as descripcion FROM TB_MEDIDAS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener medidas:", error);
    res.status(500).json({ error: "Error al obtener medidas" });
  }
};

exports.getMarcas = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT ID_MARCA as id_marca, DESCRIPCION_MARCA as descripcion FROM TB_MARCA`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    res.status(500).json({ error: "Error al obtener marcas" });
  }
};

exports.getModelos = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT ID_MODELO as id_modelo, DESCRIPCION_MODELO as descripcion FROM TB_MODELO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener modelos:", error);
    res.status(500).json({ error: "Error al obtener modelos" });
  }
};

exports.getEstadosDispositivo = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT ESTADO_DISPOSITIVO, DESCRIPCION_DISPOSITIVO FROM TB_ESTADO_DISPOSITIVO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener estados del dispositivo:", error);
    res.status(500).json({ error: "Error al obtener estados del dispositivo" });
  }
};

exports.getTecnicos = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT ID_TECNICO as id_tecnico, DESCRIPCION_TECNICO as descripcion FROM TB_TECNICO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener técnicos:", error);
    res.status(500).json({ error: "Error al obtener técnicos" });
  }
};

exports.getNits = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT NIT_PROV as nit, NOMBRE_PROV as nombre FROM TB_PROVEEDORES`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener NITs:", error);
    res.status(500).json({ error: "Error al obtener NITs" });
  }
};

exports.ingresarArticulo = async (req, res) => {
  const a = req.body;

  // Asegurar que la fecha esté en formato YYYY-MM-DD
  if (a.fechaIngresoTaller) {
    const date = new Date(a.fechaIngresoTaller);
    a.fechaIngresoTaller = isNaN(date)
      ? null
      : date.toISOString().split("T")[0];
  }

  // Convertir booleanos a 'S' o 'N'
  a.ingresoInventario = a.ingresoInventario ? "S" : "N";
  a.taller = a.taller ? "S" : "N";
  a.repuestos = a.repuestos ? "S" : "N";

  try {
    const conn = await getConnection();

    const sql = `
      INSERT INTO TB_ARTICULOS (
        CODIGO_GRUPO, CODIGO_SUBGRUPO, CODIGO_ARTICULO, DESCRIPCION_ARTICULO, INGRESO_A_INVENTARIO,
        TALLER, REPUESTO, CODIGO_MEDIDA, MARCA, MODELO, SERIE, ENTREGADOPOR,
        ESTADO_ARTICULO, FECHA_INGRESO_TALLER, EXISTENCIA_MINIMA, EXISTENCIA_MAXIMA,
        SERIE_FACTURA, NIT_PROVEEDOR, NUM_FACTURA, EXISTENCIA, NUM_INTERNO_CIT
      ) VALUES (
        :grupo, :subgrupo, :codigoArticulo, :descripcion, :ingresoInventario,
        :taller, :repuestos, :medida, :marca, :modelo, :serie, :entregaTallerPor,
        :estadoDispositivo, TO_DATE(:fechaIngresoTaller, 'YYYY-MM-DD'),
        :existenciaMinima, :existenciaMaxima, :serieFactura, :nit,
        :numFactura, :existencia, :numInternoCIT
      )
    `;

    await conn.execute(
      sql,
      {
        grupo: a.grupo ? Number(a.grupo) : null,
        subgrupo: a.subgrupo ? Number(a.subgrupo) : null,
        codigoArticulo: a.articulo ? Number(a.articulo) : null, // viene del frontend
        descripcion: a.descripcion || null,
        ingresoInventario: a.ingresoInventario,
        taller: a.taller,
        repuestos: a.repuestos,
        medida: a.medida ? Number(a.medida) : null,
        marca: a.marca ? Number(a.marca) : null,
        modelo: a.modelo ? Number(a.modelo) : null,
        serie: a.serie || null,
        entregaTallerPor: a.entregaTallerPor
          ? Number(a.entregaTallerPor)
          : null,
        estadoDispositivo:
          a.estadoDispositivo !== undefined && a.estadoDispositivo !== null
            ? Number(a.estadoDispositivo)
            : null,
        nit: a.nit !== undefined && a.nit !== null ? String(a.nit) : null,
        fechaIngresoTaller: a.fechaIngresoTaller || null,
        existenciaMinima: a.existenciaMinima
          ? Number(a.existenciaMinima)
          : null,
        existenciaMaxima: a.existenciaMaxima
          ? Number(a.existenciaMaxima)
          : null,
        serieFactura: a.serieFactura || null,
        numFactura: a.numF57 || null,
        existencia: a.existencia ? Number(a.existencia) : 0,
        numInternoCIT: a.numeroInventario || null,
      },
      { autoCommit: true }
    );

    await conn.close();
    res.json({ message: "Artículo ingresado correctamente" });
  } catch (error) {
    console.error("Error al ingresar artículo:", error);
    res.status(500).json({ error: "Error al ingresar artículo" });
  }
};
