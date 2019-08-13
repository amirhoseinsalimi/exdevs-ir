const express = require('express');

const router = express.Router();
const pool = require('../connection');

/* GET admin page. */
router.get('/', (req, res) => {
  res.render('catty');
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

      const query = 'SELECT * FROM admin WHERE user=? AND password=?;';

      connection.query(query, [user, password], (err, result) => {
        if (err) {
          console.log(`Error executing the query: ${err.name}: ${err.message}`);
          res.status(500);
          res.render('500');
        } else if (result.length > 0) {
          res.redirect('/admin');
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