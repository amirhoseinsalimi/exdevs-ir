import * as express from 'express';

import shuffle from '../../helpers/shuffle-array';

const knex = require('../../../knex-export');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  knex.select('*')
    .from('members')
    .then((members: any) => {
      members.forEach((member: any) => {
        member.photo = member.photo.replace(/uploads/g, '');
      });

      res.status(200).render('website/index', { members: shuffle(members) });
    })
    .catch((err: Error) => {
      throw Error(err.message);
    });
});

export default router;
