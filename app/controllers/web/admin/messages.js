const express = require('express');
const { authenticate } = require('../../../../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.render('admin/messages');
});

module.exports = router;
