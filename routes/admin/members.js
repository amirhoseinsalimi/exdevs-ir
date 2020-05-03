const express = require('express');

const router = express.Router();

/* GET admin page. */
router.get('/', (req, res) => {
  res.send('Hi');
});

module.exports = router;
