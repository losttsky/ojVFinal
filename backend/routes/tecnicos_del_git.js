const express = require('express');
const router = express.Router();
const tecnicosDelGITService = require('../services/tecnicos_del_gitService');

// Ruta para obtener todos los técnicos del GIT
router.get('/', async (req, res) => {
  try {
    const tecnicos = await tecnicosDelGITService.obtenerTodos();
    res.json(tecnicos);
  } catch (error) {
    console.error('Error al obtener técnicos del GIT:', error);
    res.status(500).json({ error: 'Error al obtener técnicos del GIT' });
  }
});


module.exports = router;
