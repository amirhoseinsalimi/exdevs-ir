const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../../knex-export');

/* GET admin page. */
router.get('/', (req, res) => {
  if (req.session.username) {
    res.redirect('/admin/messages');
  } else {
    res.render('admin/login');
  }
});

router.post('/', (req, res, next) => {
  const { user: username, password } = req.body;

  knex
    .where({
      username,
    })
    .select('*')
    .from('admins')
    .then(admins => {
      if (admins.length !== 0) {
        bcrypt.compare(password, admins[0].password).then(matched => {
          if (matched) {
            req.session.username = username;

            res.redirect(302, '/admin/messages');
          } else {
            res.redirect(401, '/admin');
          }
        });
      } else {
        res.redirect(401, '/admin');
      }
    })
    .catch(() => {
      res.status(500).render('500');
    });
});

module.exports = router;
