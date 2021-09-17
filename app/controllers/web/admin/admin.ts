import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { store } from '../../../middleware';

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

router.post('/', async (req, res) => {
  const { user: username, password } = req.body;

  try {
    const admins = await knex
      .where({
        username,
      })
      .select('*')
      .from('admins');

    if (admins.length === 0) {
      res.redirect('/admin');
      return
    }

    const matched = await bcrypt.compare(password, admins[0].password)

    if (matched) {
      req.session.username = username;

      res.redirect('/admin/messages');
    } else {
      res.redirect('/admin');
    }
  } catch {
    res.status(500).render('500');
  }
});

router.post('/logout', (req, res) => {
  store.clear(() => {
    res.redirect('/admin');
    console.log('C');
  });
});

export default router;
