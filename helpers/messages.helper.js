const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sgMail = require("@sendgrid/mail");
const twilio = require("twilio")(accountSid, authToken);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function generateOrderInProcessMessage(name) {
  const orderInProcessMessage = `¡Gracias por comprar con nosotros, ${name}! Su pedido está siendo procesado`;
  return orderInProcessMessage;
}
function generateNewOrderMessage(name, phone, items) {
  const msg = {
    to: process.env.PERSONAL_EMAIL,
    from: process.env.WORK_EMAIL,
    subject: `Nuevo pedido de: ${name}. Tel: ${phone}`,
    text: "Nueva compra",
    html: `<div>
    <h1>Nuevo pedido de: ${name}. Tel: ${phone}</h1>
    <h2>Productos del carrito:</h2>
      <ul>
          ${items.map((item) => {
            return `<li>Product: ${item._id}</li>
            <li>Quantity: ${item.quantity}</li>`;
          })}
      </ul>
    </div>`,
  };
  return msg;
}

function generateNewUserMessage(email, avatar, name, age, address, phone) {
  const msg = {
    to: process.env.PERSONAL_EMAIL,
    from: process.env.WORK_EMAIL,
    subject: `Nuevo registro`,
    text: "Gracias por registrarte",
    html: `<div>
    <h1>Alerta</h1>
    <h2>Un usuario se ha registrado con los siguientes datos:</h2>
      <ul>
          <li>Email: ${email}</li>
          <li>Avatar: <img src="${avatar}" alt="avatar" /></li>
          <li>Nombre: ${name}</li>
          <li>Edad: ${age}</li>
          <li>Dirección: ${address}</li>
          <li>Número de teléfono: ${phone}</li>
      </ul>
    </div>`,
  };
  return msg;
}

async function sendNewOrderEmail(user, items) {
  try {
    const { name, phone } = user;
    const msg = generateNewOrderMessage(name, phone, items);
    const sentEmail = await sgMail.send(msg);
    return sentEmail;
  } catch (error) {
    throw "Hubo un error al enviar el email de nueva orden";
  }
}

async function sendNewUserMessage(user) {
  try {
    const { email, avatar, name, age, address, phone } = user;
    const msg = generateNewUserMessage(
      email,
      avatar,
      name,
      age,
      address,
      phone
    );
    const sentEmail = await sgMail.send(msg);
    return sentEmail;
  } catch (error) {
    throw "Hubo un error al enviar el email de nuevo usuario";
  }
}
async function sendNewOrderSMS(user) {
  try {
    const { name, phone } = user;
    const message = generateOrderInProcessMessage(name);
    const newMessage = await twilio.messages.create({
      body: message,
      messagingServiceSid: process.env.PHONE_SID,
      to: phone,
    });
    return newMessage;
  } catch (error) {
    throw "Hubo un error al enviar el mensaje";
  }
}

module.exports = {
  sendNewOrderEmail,
  sendNewUserMessage,
  sendNewOrderSMS,
};
