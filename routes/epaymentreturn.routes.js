const { Router } = require("express");
const Giftcard = require("../models/Giftcard");
const router = Router();
const vismaPay = require("visma-pay");
const config = require("config");
const sendGiftCard = require("../giftcard/sendGiftCard");

// Set private key and api key
vismaPay.setPrivateKey(config.get("vismaPrivateKey"));
vismaPay.setApiKey(config.get("vismaApiKey"));

router.get("/", async (req, res) => {
  console.log("E-payment return, params:", req.query);
  try {
    const giftcard = await Giftcard.findOne({ cardId: req.query.ORDER_NUMBER });
    if (giftcard) {
      giftcard.paymentAUTHCODE = req.query.AUTHCODE;
      await giftcard.save();
    }
  } catch (e) {
    console.log(e);
  }

  vismaPay.checkReturn(req.query, async (error, result) => {
    if (error) {
      console.log("Got error: " + error.message);
      res.redirect(
        `${config.get("baseUrl")}/lahjakortti/kauppa/tulos/error/${
          error.message
        }`
      );
    } else {
      let returnCode = result.RETURN_CODE;
      let message, paymentStatus;
      let order = result.ORDER_NUMBER;
      switch (result.RETURN_CODE) {
        case "0":
          message =
            "Payment was successful, you will receive a receipt by e-mail.";
          paymentStatus = "successful";
          sendGiftCard(order);
          break;
        case "4":
          message =
            "Transaction status could not be updated after customer returned from the web page of a bank.";
          paymentStatus = "undefined";
          break;
        case "10":
          message += "Maintence break.";
          paymentStatus = "undefined";
          break;
        case "1":
          message = "Payment failed!";
          paymentStatus = "failed";
          break;
        default:
          message = "Unknown return value, please contact the seller.";
          paymentStatus = "undefined";
      }

      try {
        const giftcard = await Giftcard.findOne({ cardId: order });
        if (giftcard) {
          giftcard.payment = paymentStatus;
          giftcard.paymentMessage = message;
          giftcard.paymentStatusUpdate = Date.now();
          await giftcard.save();
        }
      } catch (e) {
        message += " Payment update to database failed, please contact seller!";
      }

      res.redirect(
        `${config.get(
          "baseUrl"
        )}/lahjakortti/kauppa/tulos/${returnCode}/${order}/${message}`
      );
    }
  });
});

module.exports = router;
