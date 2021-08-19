import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as redis from 'redis';
import * as logger from 'morgan';
import * as favicon from 'serve-favicon';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

const RedisStore = require('connect-redis')(session);

import app from '../../bootstrap/app';

const client = redis.createClient();
const {
  SECRET,
  REDIS_HOST,
  REDIS_PORT,
} = require('../../env');

app.use(helmet({
  hidePoweredBy: false,
}));
const store = new RedisStore(
  {
    host: REDIS_HOST,
    port: REDIS_PORT,
    client,
    ttl: 260,
  },
);

const cwd = process.cwd();

app.use(favicon(path.join(cwd, 'public', 'favicon.ico')));
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'testing' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: SECRET,
  store,
  saveUninitialized: false,
  resave: false,
}));
app.use(express.static(path.join(cwd, 'dist/public')));
app.use(express.static(path.join(cwd, 'public')));
app.use(express.static('uploads'));

export default app;
