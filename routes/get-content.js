const express = require('express');

const router = express.Router();
const shuffleArray = require('./../my_modules/shuffle-array');
const connection = require('../connection');
const knex = require('knex')(connection); // eslint-disable-line

/* English content */
router.get('/', (req, res) => {
  knex.select('*')
    .from('teams')
    .then((teams) => {
      const result = {
        teams: shuffleArray(teams),
      };

      res.json(result);
    })
    .catch((err) => {
      throw Error(err);
    });
});

module.exports = router;
