import * as express from 'express';

import upload from '../../helpers/uploader';
import authenticate from '../../middleware/authenticate';

const knex = require('../../../knex-export');
const router = express.Router();

/* Get All Members */
router.get('/', async (req, res) => {
  // TODO: Make interfaces for these types or use an ORM
  try {
    const members = await knex
      .select('*')
      .from('members');

    res.status(200).json([...members].reverse());
  } catch {
    res.status(500).render('500')
  }
});

/* Get A Specific Member By Its ID */
router.get('/:id', async (req, res) => {
  const { id: memberId } = req.params;

  if (!/^\d+$/.test(memberId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    const member = await knex('members')
      .where({
        id: memberId,
      })
      .select('*');

    res.status(200).json(member);
  } catch {
    res.status(500).render('500');
  }
});

/* Add A Member */
router.post('/', authenticate, upload.single('photo'), async (req, res) => {
  const requestData = req.body;
  requestData.photo = req.file.path;

  try {
    await knex('members')
      .insert(requestData);

    res.redirect('/admin/members');
  } catch {
    res.status(500).render('500');
  }
});

/* Update A Specific Member By Its ID */
router.put('/:id', authenticate, async (req, res) => {
  const {
    id: memberId,
  } = req.params;

  const {
    full_name,
    role,
    description,
    telegram,
    email,
    twitter,
    linkedin,
    github,
  } = req.body;

  try {
    await knex('members')
      .where('id', memberId)
      .update({
        full_name,
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

/* Delete A Specific Member By Its ID */
router.delete('/:id', authenticate, async (req, res) => {
  const { id: memberId } = req.params;

  if (!/^\d+$/.test(memberId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    await knex('members')
      .where('id', memberId)
      .del();

    res.status(204).end();
  } catch {
    res.status(500).render('500')
  }
});

export default router;
