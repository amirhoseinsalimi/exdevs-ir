const express = require('express');

const router = express.Router();

/* GET admin page. */
router.get('/', (req, res) => {
  res.render('catty');
});

router.post('/', (req, res) => {
  //
});

module.exports = router;
