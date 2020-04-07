const express = require('express');

const router = express.Router();
const connection = require('../connection');
const knex = require('knex')(connection); // eslint-disable-line

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
