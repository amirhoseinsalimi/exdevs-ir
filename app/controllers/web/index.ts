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
    throw Error(err.message);
  }
});

export default router;
