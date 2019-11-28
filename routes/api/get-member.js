const express = require('express');

const router = express.Router();
const pool = require('../../connection');

router.get('/:id', (req, res) => {
  const memberId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(`Error connecting to database: ${err.name}: ${err.message}`);
      res.status(500);
      res.render('500');
    }

    const query = 'SELECT * FROM `ex_website`.member WHERE id=?';

    connection.query(query, [memberId], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('500');
      } else {
        console.log(results);
        res.status(204);
        res.end();
      }

      connection.release();
    });
  });
});

module.exports = router;
