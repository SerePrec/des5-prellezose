import app from "./app.js";
const PORT = process.env.PORT || 8080;

async function startServer() {
  //Inicializo mi "storage"
  try {
    const { productosModel } = await import("./models/productos.js");
    await productosModel.init();
  } catch (error) {
    console.log(error);
  }

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
