#!/usr/bin/env node

/**
 * Module dependencies.
 */
const debug = require('debug')('generator:server');
import ErrnoException = NodeJS.ErrnoException;
import { createServer } from 'http';
import { app } from './routes';

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const address = server.address();
  const bind = typeof address === 'string'
    ? `pipe ${address}`
    : `port ${address.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
