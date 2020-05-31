const express = require('express');

const router = express.Router();
const knex = require('../../knex');

const upload = require('../../my_modules/uploader');

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

module.exports = router;
