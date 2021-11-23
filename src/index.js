import app from "./app.js";
const PORT = process.env.PORT || 8080;

async function startServer() {
  //Inicializo mi "storage"
  const { productosModel } = await import("./models/productos.js");
  productosModel.init();

  const server = app.listen(PORT, () =>
    console.log(
      `Servidor http escuchando en el puerto ${server.address().port}`
    )
  );
  server.on("error", error =>
    console.log(`Ocurrió un error en el servidor:\n ${error}`)
  );
}

startServer();