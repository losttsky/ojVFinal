const express = require('express');
const router = express.Router();
const modelosService = require('../services/modelosService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await modelosService.buscarModelos(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en Modelos:', err);
    res.status(500).send('Error al obtener modelos');
  }
});

module.exports = router;
