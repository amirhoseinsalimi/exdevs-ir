const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.username) {
    res.render('admin/members');
  } else {
    res.redirect('/admin');
  }
});

module.exports = router;
