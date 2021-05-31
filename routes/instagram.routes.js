const { Router } = require("express");
const router = Router();
const config = require("config");
const axios = require('axios');

router.get('/:limit', async (req, res) => {
    const limit = req.params.limit;
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${limit}&access_token=${config.get("instaToken")}`
      );
      console.log(response.data);
      res.json(response.data.data);
    } catch (e) {
      console.log(e);
    }
  });
  
  module.exports = router;
  