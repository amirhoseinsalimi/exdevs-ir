const express = require('express');

const router = express.Router();
const multer = require('multer');
const knex = require('../../knex');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/');
  },
  filename(req, file, callback) {
    callback(null, `${new Date().toISOString()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

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
