const express = require('express');

const router = express.Router();
const connection = require('../connection');

/* GET admin page. */
router.get('/', (req, res) => {
  res.render('catty');
});

router.post('/', (req, res) => {
  connection.connect((err) => {
    if (err) {
      console.log('connect nashod');
      console.error(err);
      res.status(500);
      res.render('500');
    } else {
      const { user } = req.body;
      const { password } = req.body;

      const query = 'SELECT * FROM admin WHERE user=? AND password=?;';

      connection.query(query, [user, password], (err, result) => {
        if (err) {
          console.error(`Error executing the query: ${err.name}: ${err.message}`);
          res.status(500);
          res.render('500');
          connection.end();
        } else {
          console.log(typeof result);
          console.log(result);

          if (result.length > 0) {
            res.redirect('/admin');
          } else {
            res.redirect('/catty');
          }

          connection.end();
        }
      });
    }
  });
});

module.exports = router;
