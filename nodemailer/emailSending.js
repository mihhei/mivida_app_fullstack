const nodemailer = require("nodemailer");
const config = require("config");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.get("emailUser"),
    pass: config.get("emailPassword"),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

const emailSending = async (mail) => {
  let result = await transport.sendMail(mail);

  return result.response.match("OK") ? { status: true } : { status: false };
};
module.exports = emailSending;
