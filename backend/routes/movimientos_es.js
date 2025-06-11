const express = require("express");
const router = express.Router();
const movimientosService = require("../services/movimientosESService");

router.post("/guardar", async (req, res) => {
  try {
    await movimientosService.guardarMovimiento(req.body);
    res.status(200).json({ message: "Movimiento guardado correctamente" });
  } catch (error) {
    console.error("❌ Error al guardar movimiento:", error);
    res.status(500).json({ error: "Error al guardar movimiento" });
  }
});

module.exports = router;
