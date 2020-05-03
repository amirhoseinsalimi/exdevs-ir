const express = require('express');

const router = express.Router();
const knex = require('../../knex');

router.get('/', (req, res) => {
  if (req.signedCookies.superuser === 'yes,heis') {
    knex
      .select('*')
      .from('messages')
      .then(messages => {
        console.log(Array.isArray(messages));
        res.render('admin/messages', { messages });

        // res.json(result);
      })
      .catch(err => {
        throw Error(err);
      });
  } else {
    res.status(401)
      .redirect('/admin');
  }
});

module.exports = router;
