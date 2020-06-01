const express = require('express');

const router = express.Router();
const shuffleArray = require('../../my_modules/shuffle-array');
const knex = require('../../knex-export');

/* GET home page. */
router.get('/', (req, res) => {
  knex.select('*')
    .from('members')
    .then((members) => {
      members.forEach((member) => {
        member.photo = member.photo.replace(/uploads/g, '');
      });

      res.status(200);
      res.render('website/index', { members: shuffleArray(members) });
    })
    .catch((err) => {
      throw Error(err);
    });
});

module.exports = router;
