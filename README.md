# Instrucciones

Por favor, leer antes de ejecutar.

## Como ejecutar el programa en su computadora:

1. Clonar el repositorio.
2. Ejecutar "npm install" para instalar las dependecias.
3. Ejecutar "npm start" o "npm run dev".

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

## Ejemplo para el .env (En caso de instalar localmente)

PRODUCTION=false
LOCAL_BASE_URL="http://localhost:8080"
CLUSTER_MODE=false
SECRET_SESSION="my_secret_session"
MONGO_CONNECTION_STRING="my_mongo_atlas_connection_string"
MONGO_DATABASE="my_database"
TWILIO_ACCOUNT_SID="my_twilio_account_sid"
TWILIO_AUTH_TOKEN="my_twilio_auth_token"
PHONE_SID="my_twilio_phone_sid"
WORK_EMAIL="my_other_email"
PERSONAL_EMAIL="my_email"
SENDGRID_API_KEY="my_api_key"

NOTA: El WORK_EMAIL debe ser diferente al PERSONAL_EMAIL. El PERSONAL_EMAIL es el mail DESTINO, el WORK_EMAIL es el mes que envia el correo. El WORK_EMAIL debe ser un mail
registrado en SendGrid para que funcione.
