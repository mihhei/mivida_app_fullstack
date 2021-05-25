const { Router } = require('express');
const config = require('config');
const router = Router();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
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
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const output = `
  <p>София, у вас новое сообщение с сайта MiVida!</p>
  <h3>Детали сообщения:</h3>
  <ul>
  <li>Имя: ${name}</li>
  <li>E-mail: ${email}</li>
  </ul>
  <h3>Сообщение</h3>
  <p>${message}</p>
  `;

  const mail = {
    from: `${name} <info@mivida.fi>`,
    to: 'mihail.heimonen@gmail.com', /*sofiya.pekki@gmail.com',*/
    subject: 'New Message from MiVida Contact Form',
    html: output,
  };

  const replyOutput = `
  <p>Dear, ${name}!</p>
  <p>This is autoreply for your request at MiVida Beauty web pages!</p>
  <p>We will contact you as soon as possible.</p>
  <p>Thank you!</p>
  <h3>Your message:</h3>
  <p>${message}</p>
  `;

  const autoReply = {
    from: 'MiVida Beauty <info@mivida.fi>',
    to: email,
    subject: 'Your message for MiVida Beauty was delivered.',
    html: replyOutput,
  };

  transport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });

  transport.sendMail(autoReply, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
});

module.exports = router;
