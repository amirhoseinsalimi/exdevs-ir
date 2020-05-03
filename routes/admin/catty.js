const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../../knex');

const saltRounds = 10;

/* GET admin page. */
router.get('/', (req, res) => {
  if (req.signedCookies.superuser === 'yes,heis') {
    res.redirect('/yttac');
  } else {
    res.render('catty');
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
            res.redirect('/yttac');
          } else {
            res.status(401);
            res.redirect('/catty');
          }
        });
      } else {
        res.redirect(401, '/catty');
      }
    })
    .catch(() => {
      res.status(500);
      next();
    });
});

module.exports = router;
