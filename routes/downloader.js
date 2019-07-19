const express = require('express');

const router = express.Router();
const { incrementDownloadLinkCounter } = require('../counter');


router.get('/', (req, res) => {
  res.redirect('/');
  // res.redirect('https://cafebazaar.ir/app/ir.expteam.timeset/');

  incrementDownloadLinkCounter();
});

module.exports = router;
