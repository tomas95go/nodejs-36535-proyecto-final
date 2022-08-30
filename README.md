# Instrucciones

Por favor, leer antes de ejecutar.

## Como ejecutar el programa en su computadora:

1. Clonar el repositorio.
2. Ejecutar "npm install" para instalar las dependecias.
3. Ejecutar "npm start" o "npm run dev".

## Ejemplo para el .env (En caso de instalar localmente)

```
MONGO_CONNECTION_STRING="my_mongo_connection_string"
MONGO_DATABASE="my_mongo_database"
TWILIO_ACCOUNT_SID="my_twilio_account_sid"
TWILIO_AUTH_TOKEN="my_twilio_auth_token"
PHONE_SID="my_phone_sid"
WORK_EMAIL="my_work_email"
PERSONAL_EMAIL="my_personal_email"
SENDGRID_API_KEY="my_sendgrid_api_key"
JWT_SECRET_KEY="my_jwt_secret_key"
JWT_EXPIRATION_TIME="my_jwt_expiration_time"
CLOUDINARY_CLOUD_NAME="my_cloudinary_cloud_name"
CLOUDINARY_API_KEY="my_cloudinary_api_key"
CLOUDINARY_API_SECRET="my_cloudinary_api_secret"
CLOUDINARY_FOLDER="my_cloudinary_folder"
```

NOTA: El WORK_EMAIL debe ser diferente al PERSONAL_EMAIL. El PERSONAL_EMAIL es el mail DESTINO, el WORK_EMAIL es el mes que envia el correo. El WORK_EMAIL debe ser un mail
registrado en SendGrid para que funcione.

## Probar el programa en Heroku

1. Tener el programa POSTMAN instalado.
2. Importar la colleción "js-36535-entrega-final.postman_collection.json".
3. Asegurarse de rellenar las variables para las request para probar los end points.
