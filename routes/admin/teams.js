const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.username) {
    res.render('admin/teams');
  } else {
    res.redirect('/admin');
  }
});

module.exports = router;
