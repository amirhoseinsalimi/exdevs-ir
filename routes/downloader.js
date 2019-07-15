const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('https://cafebazaar.ir/app/com.digikala/?l=en');
});

module.exports = router;
