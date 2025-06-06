const express = require('express');
const router = express.Router();
const medidasService = require('../services/medidasService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await medidasService.buscarMedidas(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en medidas:', err);
    res.status(500).send('Error al obtener medidas');
  }
});

module.exports = router;
