import * as express from 'express';

import shuffle from '../../helpers/shuffle-array';

import knex from '../../../knex-export';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const members = await knex.select('*').from('members');

    members.forEach((member: any) => {
      member.photo = member.photo.replace(/uploads/g, '');
    });

    res.status(200).render('website/index', { members: shuffle(members) });
  } catch (err) {
    throw Error(err.message);
  }
});

export default router;
