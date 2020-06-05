const express = require('express');

const router = express.Router();
const knex = require('../../knex-export');

/* Get All Messages */
router.get('/', (req, res) => {
  knex
    .select('*')
    .from('messages')
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Get A Specific Message By Its ID */
router.get('/:id', (req, res) => {
  const { id: messageId } = req.params;

  if (!Number(messageId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  knex('messages')
    .where({
      id: messageId,
    })
    .select('*')
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Add A Message */
router.post('/', (req, res) => {
  knex('messages')
    .insert(req.body)
    .then(() => {
      res.status(200);
      res.redirect('/');
    })
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Mark A Specific Message As Read */
router.put('/:id', (req, res) => {
  const { id: messageId } = req.params;

  if (!/^\d+$/.test(messageId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  knex('messages')
    .where('id', messageId)
    .update({
      is_read: true,
    })
    .then(() => (
      res.status(204).end()
    ))
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Delete A Specific Message By Its ID */
router.delete('/:id', (req, res) => {
  const { id: messageId } = req.params;

  if (!/^\d+$/.test(messageId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  knex('messages')
    .where('id', messageId)
    .del()
    .then(() => (
      res.status(204).end()
    ))
    .catch((err) => (
      res.status(500).json(err)
    ));
});

module.exports = router;
