const express = require('express');

const router = express.Router();
const knex = require('../../knex');

router.delete('/:id', (req, res) => {
  const { id: memberId } = req.params;

  if (!Number(memberId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  knex('members')
    .where('id', memberId)
    .del()
    .then(() => (
      res.status(204).end()
    ))
    .catch(() => (
      res.status(500).render('500')
    ));
});

module.exports = router;
