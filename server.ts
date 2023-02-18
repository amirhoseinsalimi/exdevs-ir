#!/usr/bin/env node

import * as deb from 'debug';
import envs from './envs';

const debug = deb('generator:server');
import ErrnoException = NodeJS.ErrnoException;
import { createServer } from 'http';
import { app } from './routes';
import 'reflect-metadata';

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(envs.PORT || '3001');
app.set('port', port);

const server = createServer(app);

function onError(error: ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const address = server.address();

  if (!address) {
    throw RangeError('The bound cannot be `null` or `undefined`')
  }

  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
  debug(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
