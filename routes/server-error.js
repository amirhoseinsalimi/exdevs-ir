const express = require('express');

const router = express.Router();

/* Server error */
router.get('/', (req, res) => {
  res.render('500');
});

module.exports = router;
