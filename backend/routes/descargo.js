const express = require('express');
const router = express.Router();
const descargoService = require('../services/descargoService');

// Buscar artículos por año y número de movimiento
router.post('/buscar', async (req, res) => {
  const { anioMovimiento, numMovimiento } = req.body;

  try {
    const resultados = await descargoService.obtenerArticulosPorMovimiento(anioMovimiento, numMovimiento);
    res.status(200).json(resultados);
  } catch (error) {
    console.error('❌ Error al buscar artículos:', error);
    res.status(500).json({ error: 'Error al buscar artículos' });
  }
});

// Actualizar (desligar) artículos marcados como actualizados
router.post('/actualizar', async (req, res) => {
  const { anioMovimiento, numMovimiento, articulos } = req.body;

  try {
    await descargoService.desligarArticulos(anioMovimiento, numMovimiento, articulos);
    res.status(200).json({ message: 'Artículos actualizados correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar artículos:', error);
    res.status(500).json({ error: 'Error al actualizar artículos' });
  }
});

router.get("/ultimo-movimiento", async (req, res) => {
  try {
    const movimiento = await descargoService.obtenerUltimoMovimiento();
    res.json(movimiento);
  } catch (error) {
    console.error("❌ Error al obtener último movimiento:", error);
    res.status(500).json({ error: "Error al obtener último movimiento" });
  }
});

module.exports = router;
