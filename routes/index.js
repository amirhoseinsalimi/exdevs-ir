const express = require('express');

const router = express.Router();
const { incrementIndexCounter } = require('../counter');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');

  incrementIndexCounter();
});

module.exports = router;
