const express = require("express");
const router = express.Router();
const usuariosService = require("../services/crearUsuarioService");

router.post("/", async (req, res) => {
  const { nombre_usuario, password, rol, id_tecnico } = req.body;

  try {
    await usuariosService.crearUsuario(nombre_usuario, password, rol, id_tecnico);
    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

module.exports = router;
