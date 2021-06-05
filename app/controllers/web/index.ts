import * as express from 'express';

import shuffle from '../../helpers/shuffle-array';

const knex = require('../../../knex-export');
const router = express.Router();

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

export default router;
