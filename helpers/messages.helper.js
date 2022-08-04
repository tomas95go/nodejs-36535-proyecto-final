const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sgMail = require("@sendgrid/mail");
const twilio = require("twilio")(accountSid, authToken);
const logger = require(`${__dirname}/winston.helper`);
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
    logger.log("error", "Hubo un error al enviar el email");
    throw "Hubo un error al enviar el email";
  }
}
async function sendSMS(message, number) {
  try {
    const newMessage = await twilio.messages.create({
      body: message,
      messagingServiceSid: process.env.PHONE_SID,
      to: number,
    });
    return newMessage;
  } catch (error) {
    logger.log("error", "Hubo un error al enviar el mensaje");
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
