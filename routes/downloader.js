const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect(`https://cafebazaar.ir/app/com.digikala/?l=en`);
});

module.exports = router;
