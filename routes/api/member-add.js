const express = require('express');

const router = express.Router();
const knex = require('../../knex');

const upload = require('../../my_modules/uploader');

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

module.exports = router;
