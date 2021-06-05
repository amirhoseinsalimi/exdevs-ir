/* ***************************
    Import Node.js modules
**************************** */
const express = require('express');
const path = require('path');

/* *****************************
    Application Configuration
****************************** */
// @ts-ignore
const app = express();
const cwd = process.cwd();

// view engine setup
app.set('views', path.join(cwd, 'resources/views'));
app.set('view engine', 'pug');

module.exports = app;
