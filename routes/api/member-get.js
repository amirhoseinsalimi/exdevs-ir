const express = require('express');

const router = express.Router();
const knex = require('../../knex');

router.get('/:id', (req, res) => {
  const { id: memberId } = req.params;

  if (!Number(memberId)) {
    return res.status(400).json({
      message: 'Invalid parameter',
    });
  }

  knex('members')
    .where({
      id: memberId,
    })
    .select('*')
    .then((member) => {
      res.status(200).json(member);
    })
    .catch(() => (
      res.status(500).render('500')
    ));
});

module.exports = router;
