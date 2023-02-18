import * as express from 'express';

import shuffle from '../../helpers/shuffle-array';

import { AppDataSource } from '../../../database';
import MemberRepository from '../../repository/MemberRepository';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const members = await MemberRepository.find();

    members.forEach((member: any) => {
      member.photo = member.photo.replace(/uploads/g, '');
    });

    res.status(200).render('website/index', { members: shuffle(members) });
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    } else {
      throw Error('There was an error on returning the list of members.');
    }
  }
});

export default router;
