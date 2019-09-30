const express = require('express');

const router = express.Router();
const pool = require('../connection');

router.get('/', (req, res) => {
  if (req.signedCookies.superuser === 'yes,heis') {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(`Error connecting to database: ${err.name}: ${err.message}`);
        res.status(500);
        res.render('500');
      }

      const query = 'SELECT * FROM message WHERE 1';

      connection.query(query, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500);
          res.render('500');
        } else {
          res.render('admin', { messages: results });
        }

        connection.release();
      });
    });
  } else {
    res.status(401).redirect('/catty');
  }
});

module.exports = router;
