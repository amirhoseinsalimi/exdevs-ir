const express = require('express');

const router = express.Router();

const { incrementPlayStoreLinkCounter } = require('../counter');

router.get('/', (req, res) => {
  res.download('app.apk');

  incrementPlayStoreLinkCounter();
});

module.exports = router;
