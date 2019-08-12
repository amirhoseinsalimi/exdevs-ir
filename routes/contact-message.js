const express = require('express');

const router = express.Router();
const pool = require('../connection');
const { incrementContactMessageCounter } = require('../counter');

/* Process POST data */
router.post('/', (req, res) => {
  pool.connect((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.render('500');
    } else {
      const { name } = req.body;
      const { email } = req.body;
      const { message } = req.body;

      const query = 'INSERT INTO contact (name, email, text) VALUES (?, ?, ?);';

      connection.query(query, [name, email, message], (err) => {
        if (err) {
          console.log(err);
          res.status(500);
          res.render('500');
        } else {
          res.status(200);
          res.redirect('/');
        }
      });
    }
  });

  incrementContactMessageCounter();
});

module.exports = router;
