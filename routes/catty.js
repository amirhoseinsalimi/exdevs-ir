const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../connection');

const saltRounds = 10;

/* GET admin page. */
router.get('/', (req, res) => {
  if (req.signedCookies.superuser === 'yes,heis') {
    res.redirect('/yttac');
  } else {
    res.render('catty');
  }
});

router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(`Error connecting to database: ${err.name}: ${err.message}`);
      res.status(500);
      res.render('500');
    } else {
      const { user } = req.body;
      const { password } = req.body;

      const query = 'SELECT * FROM admin WHERE username=?';

      connection.query(query, [user], (err, results) => {
        if (err) {
          console.log(`Error executing the query: ${err.name}: ${err.message}`);
          res.status(500);
          res.render('500');
        } else if (results.length > 0) {
          bcrypt.compare(password, results[0].password).then((matched) => {
            if (matched) {
              const date = (new Date(Date.now() + 86400 * 1000)).toUTCString();
              res.cookie('superuser', 'yes,heis', {
                expires: date * 7 * 86400,
                path: '/',
                signed: true,
                secure: true,
              });
              res.redirect('/yttac');
            } else {
              res.status(401);
              res.render('catty');
            }
          });
        } else {
          res.status(401);
          res.render('catty');
        }

        connection.release();
      });
    }
  });
});

module.exports = router;
