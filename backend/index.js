const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

// Rutas importadas
const areaRoutes = require("./routes/area");
const dependenciasRoutes = require("./routes/dependencias");
const entregaEquipoRoutes = require("./routes/entregaEquipo");
const estadoDispositivoRoutes = require("./routes/estadoDispositivo");
const grupoRoutes = require("./routes/grupo");
const lugar_de_entregaRoutes = require("./routes/lugar_de_entrega");
const marcaRoutes = require("./routes/marca");
const medidasRoutes = require("./routes/medidas");
const modelosRoutes = require("./routes/modelos");
const movimientosRoutes = require("./routes/movimientos");
const subgrupoRoutes = require("./routes/subgrupo");
const tecnicosRoutes = require("./routes/tecnicos");
const tecnicos_del_gitRoutes = require("./routes/tecnicos_del_git");
const articulosRoutes = require("./routes/articulos");
const movimientosEsRoutes = require("./routes/movimientosEs");
const descargoRoutes = require("./routes/descargo");
const reportesRoutes = require("./routes/reportes");

const { getConnection } = require("./db"); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });

// Montaje de rutas
app.use('/api/area', areaRoutes);
app.use('/api/entrega_equipo', entregaEquipoRoutes);
app.use('/api/dependencias', dependenciasRoutes);
app.use('/api/estado_dispositivo', estadoDispositivoRoutes);
app.use('/api/grupo', grupoRoutes);
app.use('/api/lugar_de_entrega', lugar_de_entregaRoutes);
app.use('/api/marca', marcaRoutes);
app.use('/api/medidas', medidasRoutes);
app.use('/api/modelos', modelosRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/subgrupo', subgrupoRoutes);
app.use('/api/tecnicos', tecnicosRoutes);
app.use('/api/tecnicos_del_git', tecnicos_del_gitRoutes);
app.use('/api/articulos', articulosRoutes);
app.use('/api/movimientosEs', movimientosEsRoutes);
app.use('/api/descargo', descargoRoutes);
app.use('/api/reportes', reportesRoutes);

// Ruta adicional: búsqueda de técnicos
app.get('/tecnicos', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    let query = 'SELECT * FROM TECNICOS WHERE 1=1';
    const params = [];

    if (id) {
      query += ' AND ID_TECNICO LIKE :id';
      params.push(`%${id}%`);
    }

    if (descripcion) {
      query += ' AND DESCRIPCION LIKE :desc';
      params.push(`%${descripcion}%`);
    }

    const connection = await getConnection(); // ✅ usando el pool
    const result = await connection.execute(query, params, { outFormat: 4002 });
    await connection.close();

    res.json(result.rows);
  } catch (err) {
    console.error('Error en /tecnicos:', err);
    res.status(500).send('Error en la consulta de técnicos');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
});
