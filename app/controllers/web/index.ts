import * as express from 'express';

const router = express.Router();
import shuffle from '../../helpers/shuffle-array';
const knex = require('../../../knex-export');

/* GET home page. */
router.get('/', (req, res) => {
  knex.select('*')
    .from('members')
    .then((members) => {
      members.forEach((member) => {
        member.photo = member.photo.replace(/uploads/g, '');
      });

      res.status(200).render('website/index', { members: shuffle(members) });
    })
    .catch((err) => {
      throw Error(err);
    });
});

module.exports = router;
