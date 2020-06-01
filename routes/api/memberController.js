const express = require('express');

const router = express.Router();
const knex = require('../../knex-export');

const upload = require('../../my_modules/uploader');

/* Get All Teams */
router.get('/', (req, res) => {
  knex
    .select('*')
    .from('members')
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((err) => (
      res.status(500).json(err)
    ));
});

/* Get A Specific Team By Its ID */
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

/* Add A Specific Team By Its ID */
router.post('/', upload.single('photo'), (req, res) => {
  const requestData = req.body;
  requestData.photo = req.file.path;

  knex('members')
    .insert(requestData)
    .then(() => {
      res.end('Ok');
    })
    .catch((err) => {
      throw Error(err);
    });
});

/* Update A Specific Team By Its ID */
router.put('/', upload.single('photo'), (req, res) => {
  let { photo } = req.body;

  const {
    id: memberId,
    full_name,
    role,
    description,
    telegram,
    email,
    twitter,
    linkedin,
    github,
  } = req.body;

  photo = req.file.path;

  console.log(memberId);

  knex('members')
    .where('id', memberId)
    .update({
      full_name,
      role,
      description,
      telegram,
      photo,
      email,
      twitter,
      linkedin,
      github,
    })
    .then(() => (
      res.status(204).json('Updated')
    ))
    .catch((err) => (
      res.json(err)
    ));
});

/* Delete A Specific Team By Its ID */
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
