const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../../knex-export');

/* GET admin page. */
router.get('/', (req, res) => {
  if (req.signedCookies.superuser === 'yes,heis') {
    res.redirect('admin/messages');
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
            const date = new Date(Date.now() + 86400 * 1000).toUTCString();

            res.cookie('superuser', 'yes,heis', {
              expires: date * 7 * 86400,
              path: '/',
              signed: true,
              secure: true,
            });
            res.redirect('/admin/messages');
          } else {
            res.status(401);
            res.redirect('/admin');
          }
        });
      } else {
        res.status(401);
        res.redirect('/admin');
      }
    })
    .catch(() => {
      res.status(500);
      next();
    });
});

module.exports = router;
