const express = require('express');

const router = express.Router();
const knex = require('../../knex');

/* Process POST data */
router.post('/', (req, res) => {
  knex('messages')
    .insert(req.body)
    .then(() => {
      res.status(200);
      res.redirect('/');
    })
    .catch((err) => {
      throw Error(err);
    });
});

module.exports = router;
