const pdf = require("html-pdf");
const pdfTemplate = require("../documents/htmlForGiftCard");
const Giftcard = require("../models/Giftcard");
const nodemailer = require("nodemailer");
const config = require("config");
const path = require("path");

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

const sendGiftCard = async (order) => {
  try {
    const giftcard = await Giftcard.findOne({ cardId: order });
    if (giftcard) {
      pdf
        .create(pdfTemplate(giftcard), { orientation: "landscape" })
        .toFile(`./tmp/giftcard_${order}.pdf`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("pdf created");
          const name = giftcard.nameTo;
          const email = giftcard.emailTo;
          const output = `
  <p>Уважаемая(ый) ${name}!</p>
  <h3>В данном письме на ваше имя подарочная карта от салона MiVida!</h3>
  <ul>
  <li>Имя: ${name}</li>
  <li>E-mail: ${email}</li>
  </ul>
  `;

          const mail = {
            from: "MiVida Beauty <info@mivida.fi>",
            to: `${email}, mihail.heimonen@gmail.com` /*sofiya.pekki@gmail.com',*/,
            subject: "New giftcard from MiVida",
            html: output,
            attachments: [
              {
                filename: `giftcard_${order}.pdf`,
                path: path.join(__dirname, "..", "tmp", `giftcard_${order}.pdf`),
                contentType: "application/pdf",
              },
            ],
          };
          transport.sendMail(mail, (err, data) => {
            if (err) {
              console.log("Giftcard does not sent", err);
            } else {
              console.log("Giftcard is sent succesfully");
            }
          });
        });
    }
  } catch (e) {
    console.log("Some problem with database", e);
  }
};

module.exports = sendGiftCard;
