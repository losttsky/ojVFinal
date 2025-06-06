const express = require('express');
const router = express.Router();
const grupoService = require('../services/grupoService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await grupoService.buscarGrupo(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en grupo:', err);
    res.status(500).send('Error al obtener grupos');
  }
});

module.exports = router;
