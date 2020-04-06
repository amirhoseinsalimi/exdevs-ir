const express = require('express');

const router = express.Router();
const multer = require('multer');
const connection = require('../../connection');
const knex = require('knex')(connection); // eslint-disable-line

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('photo'), (req, res) => {
  const requestData = req.body;
  requestData.photo = req.file.filename;

  knex('users')
    .insert(requestData)
    .then(() => {
      // Handle later
    })
    .catch((err) => {
      throw Error(err);
    });
});

module.exports = router;
