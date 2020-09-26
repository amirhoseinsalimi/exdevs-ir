const express = require('express');

const router = express.Router();
const knex = require('../../knex-export');

/* Get All Messages */
router.get('/', (req, res) => {
  if (req.session.username) {
    knex
      .select('*')
      .from('messages')
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch(() => (
        res.status(500).render(500)
      ));
  } else {
    res.status(401).redirect('/admin');
  }
});

/* Get A Specific Message By Its ID */
router.get('/:id', (req, res) => {
  if (req.session.username) {
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
  } else {
    res.status(401).redirect('/admin');
  }
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
  if (req.session.username) {
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
  } else {
    res.status(401).redirect('/admin');
  }
});

/* Delete A Specific Message By Its ID */
router.delete('/:id', (req, res) => {
  if (req.session.username) {
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
  } else {
    res.status(401).redirect('/admin');
  }
});

module.exports = router;
