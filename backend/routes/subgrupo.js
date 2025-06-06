const express = require('express');
const router = express.Router();
const subGrupoService = require('../services/subGrupoService');

router.get('/', async (req, res) => {
  try {
    const { id, descripcion } = req.query;
    const data = await subGrupoService.buscarSubGrupo(id, descripcion);
    res.json(data);
  } catch (err) {
    console.error('❌ Error en SubGrupo:', err);
    res.status(500).send('Error al obtener subgrupos');
  }
});

module.exports = router;
