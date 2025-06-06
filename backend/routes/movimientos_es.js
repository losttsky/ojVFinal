const express = require('express');
const router = express.Router();
const movimientosService = require('../services/movimientosESService');

// POST para guardar movimiento completo
router.post('/guardar', async (req, res) => {
  try {
    const data = req.body;
    await movimientosService.guardarMovimiento(data);
    res.status(200).json({ message: 'Movimiento guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar movimiento:', error);
    res.status(500).json({ error: 'Error al guardar movimiento' });
  }
});

module.exports = router;
