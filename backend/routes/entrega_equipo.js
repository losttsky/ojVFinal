const express = require('express');
const router = express.Router();
const entregaService = require('../services/entregaEquipoService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await entregaService.buscarEntrega(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en entrega_equipo:', err);
    res.status(500).send('Error al obtener entregas');
  }
});

module.exports = router;
