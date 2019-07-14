const express = require('express');

const router = express.Router();
const connection = require('../connection');

/* Process POST data */
router.post('/', (req, res) => {
  connection.connect((err) => {
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
          connection.end();
        } else {
          res.redirect('/');
          connection.end();
        }

        connection.end();
      });
    }
  });
});

module.exports = router;
