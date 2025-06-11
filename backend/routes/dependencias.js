const express = require("express");
const router = express.Router();
const dependenciasService = require("../services/dependenciasService");
const { getConnection } = require("../db");

// Obtener departamentos
router.get("/departamentos", async (req, res) => {
  try {
    const departamentos = await dependenciasService.obtenerDepartamentos();
    res.json(departamentos);
  } catch (err) {
    console.error("❌ Error al obtener departamentos:", err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener municipios por departamento
router.get("/municipios/:departamento", async (req, res) => {
  try {
    const municipios = await dependenciasService.obtenerMunicipios(
      req.params.departamento
    );
    res.json(municipios);
  } catch (err) {
    console.error("❌ Error al obtener municipios:", err);
    res.status(500).json({ error: err.message });
  }
});

// Guardar dependencia
router.post("/guardar", async (req, res) => {
  try {
    const { nombre, departamento, municipio, direccion } = req.body;
    console.log("📥 Datos recibidos en backend:", req.body); 

    await dependenciasService.guardarDependencia(
      nombre,
      departamento,
      municipio,
      direccion
    );
    res.status(200).json({ message: "Dependencia guardada correctamente" });
  } catch (err) {
    console.error("❌ Error al guardar dependencia:", err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las dependencias
router.get('/buscar', async (req, res) => {
  const { departamento, municipio } = req.query;

  try {
    const dependencias = await dependenciasService.buscarDependencias(departamento, municipio);
    res.json(dependencias);
  } catch (err) {
    console.error('❌ Error al buscar dependencias:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
