const express = require('express');

const router = express.Router();
const { incrementDownloadLinkCounter } = require('../counter');


router.get('/', (req, res) => {
  // res.redirect('https://cafebazaar.ir/app/ir.expteam.timeset/');
  res.set({ 'Content-Type': 'application/vnd.android.package-archive' });
  res.download('app.apk');

  incrementDownloadLinkCounter();
});

module.exports = router;
