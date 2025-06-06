// backend/routes/area.js
const express = require('express');
const router = express.Router();
const areaService = require('../services/areaService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await areaService.buscarArea(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en Area:', err);
    res.status(500).send('Error al obtener áreas');
  }
});

module.exports = router;
