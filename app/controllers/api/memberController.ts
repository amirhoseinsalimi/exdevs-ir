import * as express from 'express';

import upload from '../../helpers/uploader';
import authenticate from '../../middleware/authenticate';

import { MemberRepository } from '../../repository/MemberRepository';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const members = await MemberRepository.find();

    res.status(200).json([...members].reverse());
  } catch {
    res.status(500).render('500');
  }
});

router.get('/:id', async (req, res) => {
  const { id: memberId } = req.params;

  if (!/^\d+$/.test(memberId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    const member = await MemberRepository.findOne({
      where: {
        id: Number(memberId),
      },
    });

    res.status(200).json(member);
  } catch {
    res.status(500).render('500');
  }
});

router.post('/', authenticate, upload.single('photo'), async (req, res) => {
  const requestData = req.body;

  if (!req.file?.path) {
    return res.status(422).json('`photo` field is mandatory.')
  }

  requestData.photo = req.file.path;

  try {
    await MemberRepository.save(requestData);

    res.redirect('/admin/members');
  } catch {
    res.status(500).render('500');
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { id: memberId } = req.params;

  const {
    fullName,
    role,
    description,
    telegram,
    email,
    twitter,
    linkedin,
    github,
  } = req.body;

  try {
    await MemberRepository.update(Number(memberId), {
      fullName,
      role,
      description,
      telegram,
      email,
      twitter,
      linkedin,
      github,
    });

    res.status(204).json('Updated');
  } catch {
    res.status(500).render('500');
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const { id: memberId } = req.params;

  if (!/^\d+$/.test(memberId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    await MemberRepository.delete(Number(memberId));

    res.status(204).end();
  } catch {
    res.status(500).render('500');
  }
});

export default router;
