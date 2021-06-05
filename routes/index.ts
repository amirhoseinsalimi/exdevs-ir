import * as express from 'express';

const router = express.Router();
import app from '../app/middleware';

/* ***************************
          Page Routes
*************************** */
import index from '../app/controllers/web';

import adminLogin from '../app/controllers/web/admin/admin';
import adminMessages from '../app/controllers/web/admin/messages';
import adminMembers from '../app/controllers/web/admin/members';
import adminTeams from '../app/controllers/web/admin/teams';


app.use('/', index);

app.use('/admin', adminLogin);
app.use('/admin/messages', adminMessages);
app.use('/admin/members', adminMembers);
app.use('/admin/teams', adminTeams);

/* ******************************
        RESTful API Routes
****************************** */
import messageController from '../app/controllers/api/messageController';
import memberController from '../app/controllers/api/memberController';
import teamController from '../app/controllers/api/teamController';

app.use('/api/message', messageController);
app.use('/api/member', memberController);
app.use('/api/team', teamController);

/* ****************************
         Error Handling
**************************** */
router.get('/', (req, res) => {
  res.status(500).render('500');
});

// TODO: Move these to middleware files?
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('500');
});

export {
  app,
  router,
}
