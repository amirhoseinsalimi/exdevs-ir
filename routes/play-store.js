const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.download('app.apk');
});

module.exports = router;
