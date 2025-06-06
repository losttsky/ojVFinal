const express = require('express');
const router = express.Router();
const reportesService = require('../services/reportesService');

router.post('/responsables', async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  try {
    const datos = await reportesService.obtenerReportesResponsabilidad(fechaInicio, fechaFin);
    res.status(200).json(datos);
  } catch (error) {
    console.error('❌ Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
});

router.post('/por-serie', async (req, res) => {
  const { serie } = req.body;

  try {
    const data = await reportesService.obtenerPorSerie(serie);
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error en búsqueda por serie:', error);
    res.status(500).json({ error: 'Error al buscar por serie' });
  }
});


module.exports = router;
