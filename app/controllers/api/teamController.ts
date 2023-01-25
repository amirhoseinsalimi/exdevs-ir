import * as express from 'express';

import shuffle from '../../helpers/shuffle-array';
import authenticate from '../../middleware/authenticate';

import TeamRepository from '../../repository/TeamRepository';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await TeamRepository.find();

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
    const team = await TeamRepository.findOne({
      where: {
        id: Number(teamId),
      },
    });

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    await TeamRepository.save(req.body);

    res.redirect('/admin/teams');
  } catch {
    res.status(500).render('500');
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { name, description, color } = req.body;

  const { id: teamId } = req.params;

  try {
    await TeamRepository.update(Number(teamId), { name, description, color });

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
    await TeamRepository.delete(Number(teamId));

    res.status(204).json('Deleted');
  } catch {
    res.status(500).render('500');
  }
});

export default router;
