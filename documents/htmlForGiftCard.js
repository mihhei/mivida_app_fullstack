module.exports = ({ nameFrom, nameTo, summa, message, emailFrom, cardId }) => {
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          body {
            color: rgb(186, 147, 94);
          }
          p {
            text-align: center;  
          }
          span {
            font-style: italic;
            font-weight: bold;
            color: rgb(250, 200, 132);
          }
          .giftCard {
            margin: auto;
            margin-top: 20px;
            width: 80%;
            height: 80%;
            padding: 30px;
            border: rgb(186, 147, 94) 1px solid;
            box-shadow: 1px 1px 10px rgba(250, 200, 132, 0.8);
          }
          .lahettaja {
            margin: 10px;
            padding: 10px;
            border: rgb(250, 200, 132) 1px solid;
          }
          </style>
       </head>
       <body>
       <div class="wrapper">
       <div class="giftCard">
       <img src="data:image/png;base64,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" alt="" />
       <div>
          <div>
            <p>
              Rakas
              <span> ${nameTo}!</span>
            </p>
            <p>Tässä sinulle MiVida Beauty lahjakortti #${cardId}!</p>
            <p>
              Lahjakortin arvo on
              <span> ${summa} euroa.</span>
            </p>
            <p>
              Tervetuloa MiVida Beauty studiolle!</span>
            </p>
              <p>
                Viestisi lähettäjältä:
                <span> ${message}</span>
              </p>
          </div>
          <div class="lahettaja">
            <p>Kortin lähettäjä:</p>
            <p>
              <span>${nameFrom}</span>
            </p>
            <p>Lähettäjän sähköposti:</p>
            <p>
              <span>${emailFrom}</span>
            </p>
          </div>
        </div>
        </div>
        </div>
       </body>
    </html>
    `;
};
