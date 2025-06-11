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
const lugarEntregaRoutes = require("./routes/lugarEntrega");
const marcaRoutes = require("./routes/marca");
const medidasRoutes = require("./routes/medidas");
const modelosRoutes = require("./routes/modelos");
const movimientosRoutes = require("./routes/movimientos");
const subgrupoRoutes = require("./routes/subgrupo");
const tecnicosDelGitRoutes = require("./routes/tecnicos_del_git");
const articulosRoutes = require("./routes/articulos");
const movimientosEsRoutes = require("./routes/movimientos_es");
const descargoRoutes = require("./routes/descargo");
const reportesRoutes = require("./routes/reportes");
const tecnicosRoutes = require("./routes/tecnicos");
const loginRoutes = require("./routes/login");

const { getConnection } = require("./db"); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });

// Montaje de rutas
app.use('/api/area', areaRoutes);
app.use('/api/entregaEquipo', entregaEquipoRoutes);
app.use('/api/dependencias', dependenciasRoutes);
app.use('/api/estadoDispositivo', estadoDispositivoRoutes);
app.use('/api/grupo', grupoRoutes);
app.use('/api/lugarEntrega', lugarEntregaRoutes);
app.use('/api/marca', marcaRoutes);
app.use('/api/medidas', medidasRoutes);
app.use('/api/modelos', modelosRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/subgrupo', subgrupoRoutes);
app.use('/api/tecnicosDelGit', tecnicosDelGitRoutes);
app.use('/api/articulos', articulosRoutes);
app.use('/api/movimientosEs', movimientosEsRoutes);
app.use('/api/descargo', descargoRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/tecnico', tecnicosRoutes);
app.use('/api/login', loginRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
});
