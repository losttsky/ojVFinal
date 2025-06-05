const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const puppeteer = require("puppeteer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("file"), async (req, res) => {
  const docxPath = req.file.path;
  const outputHtmlPath = path.join(
    __dirname,
    "output",
    `${req.file.filename}.html`
  );
  const outputPdfPath = path.join(
    __dirname,
    "output",
    `${req.file.filename}.pdf`
  );

  try {
    const result = await mammoth.convertToHtml({ path: docxPath });
    fs.writeFileSync(outputHtmlPath, result.value);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(result.value, { waitUntil: "networkidle0" });
    await page.pdf({ path: outputPdfPath, format: "A4" });
    await browser.close();

    res.download(outputPdfPath, "documento.pdf", () => {
      fs.unlinkSync(docxPath);
      fs.unlinkSync(outputHtmlPath);
      fs.unlinkSync(outputPdfPath);
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("Error al convertir el documento");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
});
