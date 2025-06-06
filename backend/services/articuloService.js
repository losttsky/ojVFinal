const db = require("../db");

exports.getGrupos = async (req, res) => {
  const result = await db.execute(`SELECT id_grupo, descripcion FROM grupo`);
  res.json(result.rows);
};

exports.getSubgrupos = async (req, res) => {
  const result = await db.execute(
    `SELECT id_subgrupo, descripcion FROM subgrupo`
  );
  res.json(result.rows);
};

exports.getMedidas = async (req, res) => {
  const result = await db.execute(`SELECT id_medida, descripcion FROM medidas`);
  res.json(result.rows);
};

exports.getMarcas = async (req, res) => {
  const result = await db.execute(`SELECT id_marca, descripcion FROM marca`);
  res.json(result.rows);
};

exports.getModelos = async (req, res) => {
  const result = await db.execute(`SELECT id_modelo, descripcion FROM modelos`);
  res.json(result.rows);
};

exports.getEstadosDispositivo = async (req, res) => {
  const result = await db.execute(
    `SELECT id_estado, descripcion FROM estado_del_dispositivo`
  );
  res.json(result.rows);
};

exports.getTecnicos = async (req, res) => {
  const result = await db.execute(
    `SELECT id_tecnico, descripcion FROM tecnicos`
  );
  res.json(result.rows);
};

exports.getNits = async (req, res) => {
  const result = await db.execute(`SELECT nit, nombre FROM proveedor`);
  res.json(result.rows);
};

exports.ingresarArticulo = async (req, res) => {
  const a = req.body;

  // Convertir la fecha a formato ISO si existe
  if (a.fecha_ingreso_taller) {
    const date = new Date(a.fecha_ingreso_taller);
    a.fecha_ingreso_taller = date.toISOString().split("T")[0]; // yyyy-MM-dd
  }

  const sql = `
    INSERT INTO articulos (
      grupo, subgrupo, articulo, descripcion, ingreso_inventario, taller, repuestos,
      medida, marca, modelo, serie, entrega_taller_por, estado_dispositivo,
      fecha_ingreso_taller, existencia_minima, existencia_maxima, serie_factura,
      nit, numero_forma, existencia, numero_inventario
    ) VALUES (
      :grupo, :subgrupo, :articulo, :descripcion, :ingreso_inventario, :taller, :repuestos,
      :medida, :marca, :modelo, :serie, :entrega_taller_por, :estado_dispositivo,
      TO_DATE(:fecha_ingreso_taller, 'YYYY-MM-DD'), :existencia_minima, :existencia_maxima,
      :serie_factura, :nit, :numero_forma, :existencia, :numero_inventario
    )
  `;

  try {
    await db.execute(sql, a);
    res.json({ message: "Artículo ingresado correctamente" });
  } catch (error) {
    console.error("Error al ingresar artículo:", error);
    res.status(500).json({ error: "Error al ingresar artículo" });
  }
};
