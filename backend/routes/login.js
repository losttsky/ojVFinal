const express = require("express");
const router = express.Router();
const loginService = require("../services/loginService");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await loginService.validarUsuario(username, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ mensaje: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
