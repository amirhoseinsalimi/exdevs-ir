const express = require('express');

const router = express.Router();
const pool = require('../../connection');

router.put('/', (req, res) => {
  const { messageId } = req.body;

  console.log(req.params);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(`Error connecting to database: ${err.name}: ${err.message}`);
      res.status(500);
      res.render('500');
    }

    const query = 'UPDATE `ex_website`.message SET is_read=1 WHERE id=?';

    connection.query(query, messageId, (err) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('500');
      } else {
        res.status(204);
        res.end();
      }

      connection.release();
    });
  });
});

module.exports = router;
