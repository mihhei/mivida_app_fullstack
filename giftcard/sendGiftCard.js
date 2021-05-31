const pdf = require("html-pdf");
const fs = require("fs");   
const pdfTemplate = require("../documents/htmlForGiftCard");
const Giftcard = require("../models/Giftcard");
const emailSending = require("../nodemailer/emailSending");
const nodemailer = require("nodemailer");
const config = require("config");
const path = require("path");

const sendGiftCard = async (order) => {
  try {
    const giftcard = await Giftcard.findOne({ cardId: order });
    if (giftcard) {
      pdf
        .create(pdfTemplate(giftcard), { orientation: "landscape" })
        .toFile(`./tmp/giftcard_${order}.pdf`, async (err) => {
          if (err) {
            console.log(err);
          }
          console.log("pdf created");
          const nameTo = giftcard.nameTo;
          const emailTo = giftcard.emailTo;
          const nameFrom = giftcard.nameFrom;
          const summa = giftcard.summa;
          const emailFrom = giftcard.emailFrom;
          const output = `
  <p>Уважаемая(ый) ${nameTo}!</p>
  <h3>В данном письме на ваше имя подарочная карта от салона MiVida!</h3>
  <ul>
  <li>Имя отправителя: ${nameFrom}</li>
  <li>E-mail отправителя: ${emailFrom}</li>
  </ul>
  `;

          const autoReply = `
  <p>Уважаемая(ый) ${nameFrom}!</p>
  <h3>В данном письме подтверждаем, что подарочная карта от салона MiVida на сумму ${summa} евро доставлена!</h3>
  <ul>
  <li>Имя получателя карты: ${nameTo}</li>
  <li>E-mail получателя: ${emailTo}</li>
  </ul>
  `;

          const mail = {
            from: "MiVida Beauty <info@mivida.fi>",
            to: `${emailTo}, mihail.heimonen@gmail.com` /*sofiya.pekki@gmail.com',*/,
            subject: "New giftcard from MiVida",
            html: output,
            attachments: [
              {
                filename: `giftcard_${order}.pdf`,
                path: path.join(
                  __dirname,
                  "..",
                  "tmp",
                  `giftcard_${order}.pdf`
                ),
                contentType: "application/pdf",
              },
            ],
          };
          const replyMail = {
            from: "MiVida Beauty <info@mivida.fi>",
            to: `${emailFrom}, mihail.heimonen@gmail.com` /*sofiya.pekki@gmail.com',*/,
            subject: "Giftcard from MiVida is delivered",
            html: autoReply,
          };
          try {
            const result = await emailSending(mail);
            console.log(
              result.status
                ? "Giftcard is sent succesfully"
                : "Giftcard does not sent"
            );
            if (result.status) {
              fs.unlink(
                path.join(path.join(
                  __dirname,
                  "..",
                  "tmp",
                  `giftcard_${order}.pdf`
                )),
                (err) => {
                  if (err) {
                    throw err;
                  }
                  console.log(`giftcard_${order}.pdf file is deleted.`);
                }
              );
            }
            await emailSending(replyMail);
          } catch (e) {
            console.log("Some problem with nodemailer", e);
          }
        });
    }
  } catch (e) {
    console.log("Some problem with database", e);
  }
};

module.exports = sendGiftCard;
