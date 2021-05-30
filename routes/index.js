const express = require('express');

const router = express.Router();
const app = require('../app');

/* ***************************
          Page Routes
*************************** */
const index = require('../app/controllers/web');

const adminLogin = require('../app/controllers/web/admin/admin');
const adminMessages = require('../app/controllers/web/admin/messages');
const adminMembers = require('../app/controllers/web/admin/members');
const adminTeams = require('../app/controllers/web/admin/teams');


app.use('/', index);

app.use('/admin', adminLogin);
app.use('/admin/messages', adminMessages);
app.use('/admin/members', adminMembers);
app.use('/admin/teams', adminTeams);

/* ******************************
        RESTful API Routes
****************************** */
const messageController = require('../app/controllers/api/messageController');
const memberController = require('../app/controllers/api/memberController');
const teamController = require('../app/controllers/api/teamController');

app.use('/api/message', messageController);
app.use('/api/member', memberController);
app.use('/api/team', teamController);

/* ****************************
         Error Handling
**************************** */
router.get('/', (req, res) => {
  res.status(500).render('500');
});

module.exports = router;

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('500');
});

module.exports = app;
