const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

// Obtener todos los departamentos
router.get('/departamentos', async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute('SELECT departamento, nombreDepartamento FROM departamentos');
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener departamentos:', err);
    res.status(500).send('Error al obtener departamentos');
  }
});

// Obtener municipios por departamento
router.get('/municipios/:departamento', async (req, res) => {
  try {
    const { departamento } = req.params;
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT municipio, nombreMunicipio FROM municipios WHERE departamento = :dep`,
      { dep: departamento }
    );
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener municipios:', err);
    res.status(500).send('Error al obtener municipios');
  }
});

// Guardar dependencia
router.post('/guardar', async (req, res) => {
  try {
    const { nombre, departamento, municipio, direccion } = req.body;
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO catDependencias (DEPENDENCIA, NOMBRE_DEPENDENCIA, DEPARTAMENTO, MUNICIPIO, DIRECCION)
       VALUES (catDependencias_seq.NEXTVAL, :nombre, :departamento, :municipio, :direccion)`,
      { nombre, departamento, municipio, direccion },
      { autoCommit: true }
    );
    await conn.close();
    res.status(200).send('Dependencia guardada correctamente');
  } catch (err) {
    console.error('❌ Error al guardar dependencia:', err);
    res.status(500).send('Error al guardar dependencia');
  }
});

module.exports = router;
