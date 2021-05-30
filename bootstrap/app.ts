/* ***************************
    Import Node.js modules
**************************** */
const express = require('express');
const path = require('path');
const session = require('express-session');
const redis = require('redis');

const RedisStore = require('connect-redis')(session);

const client = redis.createClient();
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const helmet = require('helmet');

/* *****************************
    Application Configuration
****************************** */
// @ts-ignore
const app = express();
const cwd = process.cwd();

const {
  SECRET: secret,
} = require('../env');

// view engine setup
app.set('views', path.join(cwd, 'resources/views'));
app.set('view engine', 'pug');

/* ******************************
           Middlewares
****************************** */
app.use(helmet({
  hidePoweredBy: false,
}));

app.use(favicon(path.join(cwd, 'public', 'favicon.ico')));
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'testing' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret,
  store: new RedisStore(
    {
      host: '127.0.0.1',
      port: 6379,
      client,
      ttl: 260,
    },
  ),
  saveUninitialized: false,
  resave: false,
}));
app.use(express.static(path.join(cwd, 'public')));
app.use(express.static('uploads'));

module.exports = app;
