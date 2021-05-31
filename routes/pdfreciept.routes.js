const { Router } = require("express");
const pdf = require("html-pdf");
const pdfTemplate = require("../documents/htmlForReciept");
const Giftcard = require("../models/Giftcard");
const router = Router();
const path = require("path");
const fs = require("fs");

router.post("/create-pdf", async (req, res) => {
  try {
    const giftcard = await Giftcard.findOne({ cardId: req.body.order });
    if (giftcard) {
      pdf
        .create(pdfTemplate(giftcard), {})
        .toFile(`./tmp/reciept_${giftcard.cardId}.pdf`, (err) => {
          if (err) {
            console.log(err);
            res.send(Promise.reject());
          }
          console.log("pdf created");
          res.send(Promise.resolve());
        });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/fetch-pdf/:order?", (req, res) => {
  const orderId =
    typeof req.params.order !== "undefined" ? req.params.order : null;
  res.sendFile(
    path.join(__dirname, "..", "tmp", `reciept_${orderId}.pdf`),
    (err) => {
      if (err) {
        next(err);
      } else {
        // delete a reciept file after sending
        fs.unlink(
          path.join(__dirname, "..", "tmp", `reciept_${orderId}.pdf`),
          (err) => {
            if (err) {
              throw err;
            }
            console.log(`reciept_${orderId}.pdf file is deleted.`);
          }
        );
      }
    }
  );
});

module.exports = router;
