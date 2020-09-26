const express = require('express');

const router = express.Router();

/* GET admin page. */
router.get('/', (req, res) => {
  if (req.session.username) {
    res.redirect('/admin/members');
  } else {
    res.status(401).redirect('/admin');
  }
});

module.exports = router;
