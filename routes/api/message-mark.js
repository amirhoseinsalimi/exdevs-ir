const express = require('express');

const router = express.Router();
const knex = require('../../knex');

router.put('/:id', (req, res) => {
  const { id: messageId } = req.params;

  if (!Number(messageId)) {
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

module.exports = router;
