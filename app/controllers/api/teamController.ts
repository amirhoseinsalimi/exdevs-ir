import * as express from 'express';

import shuffle from '../../helpers/shuffle-array';
import authenticate from '../../middleware/authenticate';

import knex from '../../../knex-export';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await knex.select('*').from('teams');

    const result = {
      teams: shuffle(teams),
    };

    res.status(200).json(result);
  } catch {
    res.status(500).render('500');
  }
});

router.get('/:id', async (req, res) => {
  const { id: teamId } = req.params;

  if (!/^\d+$/.test(teamId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    const team = await knex('teams')
      .where({
        id: teamId,
      })
      .select('*');

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    await knex('teams').insert(req.body);

    res.redirect('/admin/teams');
  } catch {
    res.status(500).render('500');
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { name, description, color } = req.body;

  const { id: teamId } = req.params;

  try {
    await knex('teams').where('id', teamId).update({
      name,
      description,
      color,
    });

    res.status(204).json('Updated');
  } catch {
    res.status(500).render('500');
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const { id: teamId } = req.params;

  if (!/^\d+$/.test(teamId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  try {
    await knex('teams').where('id', teamId).del();

    res.status(204).json('Deleted');
  } catch {
    res.status(500).render('500');
  }
});

export default router;
