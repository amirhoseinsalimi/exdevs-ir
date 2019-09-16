const express = require('express');

const router = express.Router();
const { incrementIndexCounter } = require('../counter');
const shuffleArray = require('./../my_modules/shuffle-array');

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200);
  res.render('index');

  incrementIndexCounter();
});

module.exports = router;
