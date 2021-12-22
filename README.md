# Desafío 5 - Programación Backend
### CoderHouse

## Motores de Plantillas
### Consigna:
I) Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
- Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
- Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
- Ambas páginas contarán con un botón que redirija a la otra.

II) Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.

III) Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.

#### Aspectos a incluir en el entregable:
- Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)
- En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

### Ejecución
El proyecto se encuentra estructurado en 3 carpetas diferentes con sus respectivos `package.json`.

Cada carpeta corresponde al uso de un motor de plantillas diferente: `ejs`, `hbs` y`pug`.

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm run dev`. De lo contrario, para ejecutarlo en "modo producción", utilizar `npm start`
