const express = require('express');

const router = express.Router();
const pool = require('../../connection');

router.post('/', (req, res) => {
  let {
    firstName,
    lastName,
    team,
    position,
    briefText,
    github,
    telegram,
    twitter,
    email,
    linkedIn,
  } = req.body;

  firstName = firstName || '';
  lastName = lastName || '';
  team = team || '';
  position = position || '';
  briefText = briefText || '';
  github = github || '';
  telegram = telegram || '';
  email = email || '';
  linkedIn = linkedIn || '';
  twitter = twitter || '';

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(`Error connecting to database: ${err.name}: ${err.message}`);
      res.status(500);
      res.render('500');
    }

    const query = 'INSERT INTO ex_website.member (first_name, last_name, team, position, brief_text, github, linkedin, twitter, telegram, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, [
      firstName,
      lastName,
      team,
      position,
      briefText,
      github,
      linkedIn,
      twitter,
      telegram,
      email,
    ], (err) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('500');
      } else {
        res.status(204);
        res.end();
      }

      connection.release();
    });
  });
});

module.exports = router;
