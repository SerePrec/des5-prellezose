const express = require("express");
const router = express.Router();
const productos = require("../models/productos");
const validateData = require("../middelwares/validateData");

router.get("/", async (req, res) => {
  try {
    const lista = await productos.getAll();
    res.json(lista);
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
  }
});

router.post("/", validateData.validatePostBody, async (req, res) => {
  try {
    let { title, price, thumbnail } = req.body;
    let newProduct = { title, price, thumbnail };
    newProduct = await productos.save(newProduct);
    res.json(newProduct);
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo agregar el producto"
    });
  }
});

router.get("/:id", validateData.validateId, async (req, res) => {
  try {
    const producto = await productos.getById(req.params.id);
    producto !== null
      ? res.json(producto)
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
  }
});

router.put(
  "/:id",
  validateData.validateId,
  validateData.validatePutBody,
  async (req, res) => {
    try {
      const { title, price, thumbnail } = req.body;
      const { id } = req.params;
      let updateProduct = { title, price, thumbnail };
      updateProduct = await productos.updateById(id, updateProduct);
      updateProduct !== null
        ? res.json(updateProduct)
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
      error.contenedor || console.log(error);
      res.status(500).json({
        error: "No se pudo actualizar el producto"
      });
    }
  }
);

router.delete("/:id", validateData.validateId, async (req, res) => {
  try {
    const deletedId = await productos.deleteById(req.params.id);
    deletedId !== null
      ? res.json({ result: "ok", deletedId })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
  }
});

module.exports = router;
