const express = require('express');

const router = express.Router();
const app = require('../app');

/* ***************************
          Page Routes
*************************** */
const index = require('./website/index');

const adminLogin = require('./admin/admin');
const adminMessages = require('./admin/messages');
const adminMembers = require('./admin/members');
const adminTeams = require('./admin/teams');


app.use('/', index);

app.use('/admin', adminLogin);
app.use('/admin/messages', adminMessages);
app.use('/admin/members', adminMembers);
app.use('/admin/teams', adminTeams);

/* ******************************
        RESTful API Routes
****************************** */
const messageController = require('./api/messageController');
const memberController = require('./api/memberController');
const teamController = require('./api/teamController');

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
