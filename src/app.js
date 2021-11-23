import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import productosRouter from "./routes/productos.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/productos", productosRouter);

// error 404
app.use((req, res, next) => {
  res.status(404).send(`
  <h2 style="color:red;text-align:center;width:100%;">⚠️ Error 404: no existe el recurso</h2>`);
});

export default app;
