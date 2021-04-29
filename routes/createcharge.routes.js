const { Router } = require("express");
const Giftcard = require("../models/Giftcard");
const router = Router();
const vismaPay = require("visma-pay");
const config = require("config");

// Set private key and api key
vismaPay.setPrivateKey(config.get("vismaPrivateKey"));
vismaPay.setApiKey(config.get("vismaApiKey"));

router.get("/:selected?/:order?", async (req, res) => {
  const selected =
    typeof req.params.selected !== "undefined" ? req.params.selected : null;
  const orderId =
    typeof req.params.order !== "undefined" ? req.params.order : null;

  try {
    const giftcard = await Giftcard.findOne({ cardId: orderId });
    console.log(giftcard.summa*100);
    if (giftcard) {
        const summa = giftcard.summa*100;
        const chargeObject = {
            amount: summa,
            order_number: orderId, // Order number shall be unique for every order
            currency: 'EUR',
            payment_method: {
                type: 'e-payment',
                return_url: req.protocol + '://' + req.get('host') + '/e-payment-return',
                notify_url: req.protocol + '://' + req.get('host') + '/e-payment-notify',
                lang: 'en'
            },
            customer: { // Optional customer details
    
                // All fields are optional
                firstname: giftcard.nameFrom,
                email: giftcard.emailFrom
            },
            products: [{ // Optional product fields
    
                    // All fields required
                    id: 'MIVIDA',
                    title: 'GIFTCARD',
                    count: 1,
                    pretax_price: summa,
                    tax: 0,
                    price: summa, // Product prices must match with the total amount
                    type: 1
                }
            ]
        };

      if (selected) chargeObject.payment_method.selected = [selected];

      vismaPay.createCharge(chargeObject, function (error, charge, result) {
        console.log("createCharge response: ", result);

        let token = "";
        if (error) {
          console.log("Error: " + error.message);
          res.status(500);
        } else {
          // A payment token is returned in a successful response
          if (result.result == 0) {
            console.log(
              "Got token = " +
                result.token +
                " for charge = " +
                charge.order_number
            );
            token = result.token;
          }
        }

        if (token !== "") res.redirect(vismaPay.apiUrl + "token/" + token);
        else res.end("Something went wrong when creating a charge.");
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
