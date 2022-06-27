# Instrucciones

Por favor, leer antes de ejecutar.

## Como ejecutar el programa en su computadora:

1. Clonar el repositorio.
2. Ejecutar "npm install" para instalar las dependecias.
3. Ejecutar "npm start" o "npm run dev".

## Como ejecutar el programa desde Glitch:

- Probar los End Points listados abajo con Postman, Insomnia u otra herramienta similar reemplazando: http://localhost:8080 por https://grizzled-various-save.glitch.me/.

## Listado de los diferentes endpoints

- Carritos/REST:

| HTTP   | ENDPOINT                                                             | RESULTADO                       |
| ------ | -------------------------------------------------------------------- | ------------------------------- |
| POST   | http://localhost:8080/api/carrito                                    | Agrega carrito                  |
| DELETE | http://localhost:8080/api/carrito/:id_carrito                        | Borrado (lógico) carrito        |
| GET    | http://localhost:8080/api/carrito/:id_carrito/productos              | Listado de productos en carrito |
| POST   | http://localhost:8080/api/carrito/:id_carrito/productos              | Agrega productos al carrito     |
| DELETE | http://localhost:8080/api/carrito/:id_carrito/productos/:id_producto | Borra un producto de un carrito |

- Productos/REST:

| HTTP   | ENDPOINT                                | RESULTADO              |
| ------ | --------------------------------------- | ---------------------- |
| GET    | http://localhost:8080/api/productos     | Listado de álbumes     |
| GET    | http://localhost:8080/api/productos/:id | Álbum individual       |
| POST   | http://localhost:8080/api/productos/    | Agrega álbumes         |
| PUT    | http://localhost:8080/api/productos/:id | Actualiza álbum        |
| DELETE | http://localhost:8080/api/productos/:id | Borrado (lógico) álbum |

- Para probar los accesos de ADMIN cambiar la variable isAdmin en helpers/admin.helper.js de TRUE a FALSE o viceversa.
- Para probar que método/ruta no fue implementado, escribir: http://localhost:8080/api/product o similar, una ruta que no exista.

## Ejemplo para POST de producto

{
"name": "AmeriKKKa's Most Wanted",
"description": "Ice Cube's album",
"price": 29.99,
"code": 1,
"img": "https://i.discogs.com/ukKYqxz-LPzo4RXmvyOeRu4LtMzqtxzpCmwJ8chV1SQ/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyOTE1/Ny0xMTk1MzgyNDYz/LmpwZWc.jpeg",
"stock": 10
}

## Ejemplo para POST agregar producto a carrito

[{"id": 1}, {"id": 2}]
