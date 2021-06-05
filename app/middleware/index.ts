import * as express from 'express';
import * as path from 'path';
const session = require('express-session');
const redis = require('redis');
const app = require('../../bootstrap/app');

const RedisStore = require('connect-redis')(session);

const client = redis.createClient();
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
  SECRET,
  REDIS_HOST,
  REDIS_PORT,
} = require('../../env');
app.use(helmet({
  hidePoweredBy: false,
}));
const cwd = process.cwd();

app.use(favicon(path.join(cwd, 'public', 'favicon.ico')));
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'testing' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: SECRET,
  store: new RedisStore(
    {
      host: REDIS_HOST,
      port: REDIS_PORT,
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
