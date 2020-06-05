const express = require('express');

const router = express.Router();
const knex = require('../../knex-export');

/* Get All Teams */
router.get('/', (req, res) => {
  knex
    .select('*')
    .from('teams')
    .then((teams) => {
      res.status(200).json(teams);
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

/* Add A Specific Team By Its ID */
router.post('/', (req, res) => {
  knex('teams')
    .insert(req.body)
    .then(() => (
      res.status(201).json('Created')
    ))
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Update A Specific Team By Its ID */
router.put('/', (req, res) => {
  const {
    id: teamId,
    name,
    description,
    color,
  } = req.body;

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
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Delete A Specific Team By Its ID */
router.delete('/:id', (req, res) => {
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
    .catch((err) => (
      res.status(500).json(err)
    ));
});

module.exports = router;
