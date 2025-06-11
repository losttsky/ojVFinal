const express = require('express');
const router = express.Router();
const estadoService = require('../services/estado_DispositivoService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await estadoService.buscarEstado(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en estado_dispositivo:', err);
    res.status(500).send('Error al obtener estados');
  }
});

module.exports = router;
