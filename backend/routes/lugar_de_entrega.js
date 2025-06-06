const express = require('express');
const router = express.Router();
const lugarService = require('../services/lugarEntregaService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await lugarService.buscarLugarEntrega(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en lugar de entrega:', err);
    res.status(500).send('Error al obtener lugares de entrega');
  }
});

module.exports = router;
