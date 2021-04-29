const { Router } = require('express');
const Giftcard = require('../models/Giftcard');
const router = Router();
const vismaPay = require('visma-pay');
const config = require("config");

// Set private key and api key
vismaPay.setPrivateKey(config.get("vismaPrivateKey"));
vismaPay.setApiKey(config.get("vismaApiKey"));


router.get('/get-merchant-payment-methods', function(req, res) {
	vismaPay.getMerchantPaymentMethods("", function(error, currency, result) {
		
		var response = '';

		if(error)
		{
			console.log("Got error: " + error.message);
			res.status(500)
		}
		else if(result.result !== 0)
		{
			console.log("Unable to get merchant payment methods");
			res.status(500)
		}
		else
		{
      console.log(result.result);
			response = JSON.stringify(result.payment_methods);
		}
console.log(response);
		res.end(response);
	});
});

router.post('/post', async (req,res)=>{
  try {
    let id;
    const getMaxId = await Giftcard.find().sort({ cardId: -1 }).limit(1);
    console.log('sort', getMaxId);

    if (getMaxId.length === 0) {
      id = 1000;
    } else {
      id = getMaxId[0].cardId + 1;
    }
    console.log('cardId', id);
    const giftcard = new Giftcard({
      cardId: id,
      nameTo: req.body.nameTo,
      emailTo: req.body.emailTo,
      summa: req.body.summa,
      nameFrom: req.body.nameFrom,
      emailFrom: req.body.emailFrom,
      message: req.body.message,
    });

    await giftcard.save();

    res.status(201).json({ giftcard });

  } catch (e) {
    res.status(500).json({ message: 'Something goes wrong!' });
  }
});
  

module.exports = router;
