const express = require("express");
const app = express();
const productosRouter = require("./routes/productos");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/productos", productosRouter);

// error 404
app.use((req, res, next) => {
  res.status(404).send(`
  <h2 style="color:red;text-align:center;width:100%;">⚠️ Error 404: no existe el recurso</h2>`);
});

module.exports = app;
