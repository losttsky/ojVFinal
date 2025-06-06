const express = require('express');
const router = express.Router();
const marcaService = require('../services/marcaService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await marcaService.buscarMarca(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en marca:', err);
    res.status(500).send('Error al obtener marcas');
  }
});

module.exports = router;
