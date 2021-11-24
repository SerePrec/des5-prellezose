import * as fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class Contenedor {
  constructor(filename = "testDB.json") {
    this.path = path.join(__dirname, "..", "..", "DB", filename);
    this.nextId = null;
  }

  async init() {
    console.log("Inicializando contenedor...");
    try {
      if (this.nextId) return; // evita se inicialice más de una vez
      try {
        const content = await this.getAll();
        const lastId = content.reduce(
          (acc, cur) => (cur.id > acc ? cur.id : acc),
          0
        );
        this.nextId = lastId + 1;
        console.log("Contenedor inicializado con archivo preexistente");
      } catch (error) {
        await fs.writeFile(this.path, JSON.stringify([]));
        this.nextId = 1;
        console.log("Contenedor inicializado vacío");
      }
    } catch (error) {
      throw new Error(`Error al inicializar: ${error}`);
    }
  }

  async save(elemento) {
    try {
      const { title, price, thumbnail } = elemento;
      const id = this.nextId;
      const producto = { id, title, price, thumbnail };
      const content = await this.getAll();
      content.push(producto);
      await fs.writeFile(this.path, JSON.stringify(content, null, 2));
      this.nextId++;
      console.log("Elemento guardado con éxito");
      return producto;
    } catch (error) {
      throw new Error(`Error al guardar el elemento: ${error}`);
    }
  }

  async getAll() {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`No se pudo recuperar archivo de datos: ${error}`);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const match = content.find(elem => elem.id == id);
      return !!match ? match : null;
    } catch (error) {
      throw new Error(`Error al obtener el elemento con id '${id}': ${error}`);
    }
  }

  async updateById(id, elemento) {
    try {
      const content = await this.getAll();
      const match = content.find(elem => elem.id === id);
      if (match) {
        const {
          title = match.title,
          price = match.price,
          thumbnail = match.thumbnail
        } = elemento;
        const newProducto = { ...match, title, price, thumbnail };
        const newContent = content.map(elem =>
          elem.id !== id ? elem : newProducto
        );
        await fs.writeFile(this.path, JSON.stringify(newContent, null, 2));
        console.log(`El elemento con id: ${id} se actualizó con éxito`);
        return newProducto;
      } else {
        console.log(`No se encontró el elemento con el id: ${id}`);
        return null;
      }
    } catch (error) {
      throw new Error(
        `Error al actualizar el elemento con id '${id}': ${error}`
      );
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.path, JSON.stringify([]));
      console.log("Todos los elementos borrados con éxito");
      return true;
    } catch (error) {
      throw new Error(`Error al borrar todos los elementos: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const match = content.find(elem => elem.id == id);
      if (match) {
        const newContent = content.filter(elem => elem.id != id);
        await fs.writeFile(this.path, JSON.stringify(newContent, null, 2));
        console.log(`El elemento con id: ${id} se eliminó con éxito`);
        return id;
      } else {
        console.log(`No se encontró el elemento con el id: ${id}`);
        return null;
      }
    } catch (error) {
      throw new Error(`Error al borrar el elemento con id '${id}': ${error}`);
    }
  }
}

export default Contenedor;
