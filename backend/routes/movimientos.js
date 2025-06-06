const express = require('express');
const router = express.Router();
const movimientosService = require('../services/movimientosService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await movimientosService.buscarMovimientos(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en Movimientos:', err);
    res.status(500).send('Error al obtener movimientos');
  }
});

module.exports = router;
