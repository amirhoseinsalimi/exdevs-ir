const express = require('express');
const { authenticate } = require('../../../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.render('admin/members');
});

module.exports = router;
