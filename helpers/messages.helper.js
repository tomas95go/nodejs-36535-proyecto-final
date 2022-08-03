const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(newUser, subject, message) {
  try {
    const { email, avatar, name, age, address, phone } = newUser;
    const msg = {
      to: email,
      from: process.env.PERSONAL_EMAIL,
      subject: subject,
      text: message,
      html: `<div>
      <h1>Bienvenido</h1>
      <h2>Te has registrado con los siguientes datos:</h2>
        <ul>
            <li>Email: ${email}</li>
            <li>Avatar: ${avatar}</li>
            <li>Nombre: ${name}</li>
            <li>Edad: ${age}</li>
            <li>Dirección: ${address}</li>
            <li>Número de teléfono: ${phone}</li>
        </ul>
      </div>`,
    };
    const sentEmail = await sgMail.send(msg);
    return sentEmail;
  } catch (error) {
    throw "Hubo un error al enviar el email";
  }
}
async function sendSMS(message, number) {
  try {
    const newMessage = await twilio.messages.create({
      from: process.env.PERSONAL_PHONE_NUMBER,
      to: process.env.PERSONAL_PHONE_NUMBER,
    });
    return newMessage;
  } catch (error) {
    throw "Hubo un error al enviar el mensaje";
  }
}

function sendWhatsApp(message) {
  return true;
}

module.exports = {
  sendEmail,
  sendSMS,
  sendWhatsApp,
};
