const express = require('express');
const router = express.Router();
const articulosService = require('../services/articulosService');

router.get('/grupos', articulosService.getGrupos);
router.get('/subgrupos', articulosService.getSubgrupos);
router.get('/medidas', articulosService.getMedidas);
router.get('/marcas', articulosService.getMarcas);
router.get('/modelos', articulosService.getModelos);
router.get('/estados-dispositivo', articulosService.getEstadosDispositivo);
router.get('/tecnicos', articulosService.getTecnicos);
router.get('/nits', articulosService.getNits);
router.post('/ingresar', articulosService.ingresarArticulo);

module.exports = router;
