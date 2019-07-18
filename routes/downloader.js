const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.redirect('https://cafebazaar.ir/app/ir.expteam.timeset/');
  res.download('app.apk');
});

module.exports = router;
