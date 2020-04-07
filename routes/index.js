const express = require('express');

const router = express.Router();
const shuffleArray = require('./../my_modules/shuffle-array');
const connection = require('../connection');
const knex = require('knex')(connection); // eslint-disable-line

/* GET home page. */
router.get('/', (req, res) => {
  knex.select('*')
    .from('members')
    .then((members) => {
      members.forEach((member) => {
        member.photo = member.photo.replace(/uploads/g, '');
      });

      res.status(200);
      res.render('index', { members: shuffleArray(members) });
    })
    .catch((err) => {
      throw Error(err);
    });
});

module.exports = router;
