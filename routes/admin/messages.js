const express = require('express');

const router = express.Router();
const knex = require('../../knex-export');

router.get('/', (req, res) => {
  if (req.session.username) {
    knex
      .select('*')
      .from('messages')
      .then(messages => {
        res.status(200).render('admin/messages', { messages });

        // res.json(result);
      })
      .catch(err => {
        throw Error(err);
      });
  } else {
    res.status(401).redirect('/admin');
  }
});

module.exports = router;
