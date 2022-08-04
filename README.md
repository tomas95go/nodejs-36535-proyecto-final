# Instrucciones

Por favor, leer antes de ejecutar.

## Como ejecutar el programa en su computadora:

1. Clonar el repositorio.
2. Ejecutar "npm install" para instalar las dependecias.
3. Ejecutar "npm start" o "npm run dev".

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

## Probar el programa en Heroku

1. Tener el programa POSTMAN instalado.
2. Importar la colleción "js-36535-entrega-final.postman_collection.json".
3. En la sección "variable" de la colleción ingresar un value en EMAIL y un value en PHONE (formato: +54.... u otro prefijo) para probar los end points.
4. Una vez importada la colleción en la request de LOGIN, NEW CART colocar email en el JSON.
5. Al haber finalizado con esta configuración, seguir los siguientes pasos:
   5.1. Realizar el registro de un nuevo usuario con sus respectivos datos.
   5.2. Realizar el login con las credeciales correspondientes.
   5.3. Crear un nuevo carrito con el email correspondiente.
   5.4. Realizar el checkout con el ID del carrito obtenido en el paso 5.3.
   5.5. Realizar una consulta al perfil para obtener los datos del usuario.

Notas:
-Algunos endpoints deberían fallar si el usuario no está logueado, por ejemplo: /api/profile.
-Por el momento no se guarda la imagen en Heroku, si en la instalación local con el debido .env (PRODUCTION en FALSE).
