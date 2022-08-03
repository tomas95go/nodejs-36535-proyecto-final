const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(subject, message, html) {
  try {
    const msg = {
      to: process.env.PERSONAL_EMAIL,
      from: process.env.WORK_EMAIL,
      subject: subject,
      text: message,
      html: html,
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
