/* ***************************
    Import Node.js modules
**************************** */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const helmet = require('helmet');

/* *****************************
    Application Configuration
****************************** */
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* ******************************
           Middlewares
****************************** */
app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('bethesmartestpersomintheroot'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));

/* ***************************
          Page Routes
*************************** */
const index = require('./routes/website/index');
const sendMessage = require('./routes/website/contact-message');
const getContent = require('./routes/website/get-content');
const serverError = require('./routes/server-error');

const adminLogin = require('./routes/admin/admin');
const adminMessages = require('./routes/admin/messages');
const adminMembers = require('./routes/admin/members');


app.use('/', index);
app.use('/contact-message', sendMessage);
app.use('/get-content', getContent);
app.use('/server-error', serverError);

app.use('/admin', adminLogin);
app.use('/admin/messages', adminMessages);
app.use('/admin/members', adminMembers);

/* ******************************
        RESTful API Routes
****************************** */
const deleteMessage = require('./routes/api/message-delete');
const markMessage = require('./routes/api/message-mark');
const getMember = require('./routes/api/member-get');
const addMember = require('./routes/api/member-add');
const deleteMember = require('./routes/api/member-delete');
const updateMember = require('./routes/api/member-update');

app.use('/api/delete-message', deleteMessage);
app.use('/api/mark-message', markMessage);
app.use('/api/add-member', addMember);
app.use('/api/get-member', getMember);
app.use('/api/delete-member', deleteMember);
app.use('/api/update-member', updateMember);

/* ****************************
         Error Handling
**************************** */
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
