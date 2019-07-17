const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('https://cafebazaar.ir/app/ir.expteam.timeset/');
});

module.exports = router;
