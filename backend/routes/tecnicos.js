const express = require('express');
const router = express.Router();
const tecnico = require('../services/tecnicosService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await tecnico.buscarTecnicos(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en Tecnicos:', err);
    res.status(500).send('Error al obtener tecnicos');
  }
});

module.exports = router;
