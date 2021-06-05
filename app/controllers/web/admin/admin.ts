import * as express from 'express';
import * as bcrypt from 'bcrypt';

const knex = require('../../../../knex-export');
const router = express.Router();

router.get('/', (req, res) => {
  // @ts-ignore
  if (req.session.username) {
    res.redirect('/admin/messages');
  } else {
    res.render('admin/login');
  }
});

router.post('/', (req, res) => {
  const { user: username, password } = req.body;

  knex
    .where({
      username,
    })
    .select('*')
    .from('admins')
    .then(admins => {
      if (admins.length !== 0) {
        bcrypt.compare(password, admins[0].password).then(matched => {
          if (matched) {
            // @ts-ignore
            req.session.username = username;

            res.redirect('/admin/messages');
          } else {
            res.redirect('/admin');
          }
        });
      } else {
        res.redirect('/admin');
      }
    })
    .catch(() => {
      res.status(500).render('500');
    });
});

export default router;
