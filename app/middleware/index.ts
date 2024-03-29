import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as redis from 'redis';
import * as logger from 'morgan';
import * as favicon from 'serve-favicon';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';

import * as connectRedis from 'connect-redis';

import envs from '../../envs';

import app from '../../bootstrap/app';
const RedisStore = connectRedis(session);

const client = redis.createClient();

app.use(
  helmet({
    hidePoweredBy: false,
  }),
);
const store = new RedisStore({
  host: envs.REDIS_HOST,
  port: Number(envs.REDIS_PORT),
  client,
  ttl: 260,
});

const cwd = process.cwd();

app.use(favicon(path.join(cwd, 'public', 'favicon.ico')));
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'testing' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: envs.SECRET,
    store,
    saveUninitialized: false,
    resave: false,
  }),
);
app.use(express.static(path.join(cwd, 'dist/public')));
app.use(express.static(path.join(cwd, 'public')));
app.use(express.static('uploads'));

export default app;
export { store };
