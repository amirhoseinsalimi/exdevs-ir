const express = require('express');

const router = express.Router();
const knex = require('../../../knex-export');
const { authenticate } = require('../../middleware/authenticate');

/* Get All Messages */
router.get('/', authenticate, (req, res) => {
  knex
    .select('*')
    .from('messages')
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch(() => (
      res.status(500).render('500')
    ));
});

/* Get A Specific Message By Its ID */
router.get('/:id', authenticate, (req, res) => {
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
    .catch(() => (
      res.status(500).render('500')
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
router.put('/:id', authenticate, (req, res) => {
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
    .catch(() => (
      res.status(500).render('500')
    ));
});

/* Delete A Specific Message By Its ID */
router.delete('/:id', authenticate, (req, res) => {
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
    .catch(() => (
      res.status(500).render('500')
    ));
});

module.exports = router;
