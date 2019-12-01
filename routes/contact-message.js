const express = require('express');

const router = express.Router();
const pool = require('../connection');

/* Process POST data */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.render('500');
    } else {
      const { name } = req.body;
      const { email } = req.body;
      const { message } = req.body;

      const query = 'INSERT INTO `message`(`sender_name`, `sender_email`, `message_text`, `is_read`) VALUES (?, ?, ?, ?)';

      connection.query(query, [name, email, message, 0], (err) => {
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
});

module.exports = router;
