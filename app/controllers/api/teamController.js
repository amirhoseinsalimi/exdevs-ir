const express = require('express');

const router = express.Router();
const knex = require('../../../knex-export');
const shuffleArray = require('../../../utils/shuffle-array');
const { authenticate } = require('../../../middlewares/authenticate');

/* Get All Teams */
router.get('/', (req, res) => {
  knex
    .select('*')
    .from('teams')
    .then((teams) => {
      const result = {
        teams: shuffleArray(teams),
      };

      res.status(200).json(result);
    })
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Get A Specific Team By Its ID */
router.get('/:id', (req, res) => {
  const { id: teamId } = req.params;

  if (!/^\d+$/.test(teamId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  knex('teams')
    .where({
      id: teamId,
    })
    .select('*')
    .then((team) => {
      res.status(200).json(team);
    })
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Add A Team */
router.post('/', authenticate, (req, res) => {
  knex('teams')
    .insert(req.body)
    .then(() => (
      res.redirect('/admin/teams')
    ))
    .catch(() => (
      res.status(500).render('500')
    ));
});

/* Update A Specific Team By Its ID */
router.put('/:id', authenticate, (req, res) => {
  const {
    name,
    description,
    color,
  } = req.body;

  const { id: teamId } = req.params;

  knex('teams')
    .where('id', teamId)
    .update({
      name,
      description,
      color,
    })
    .then(() => (
      res.status(204).json('Updated')
    ))
    .catch(() => (
      res.status(500).render('500')
    ));
});

/* Delete A Specific Team By Its ID */
router.delete('/:id', authenticate, (req, res) => {
  const { id: teamId } = req.params;

  if (!/^\d+$/.test(teamId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  knex('teams')
    .where('id', teamId)
    .del()
    .then(() => (
      res.status(204).json('Deleted')
    ))
    .catch(() => (
      res.status(500).render('500')
    ));
});

module.exports = router;
