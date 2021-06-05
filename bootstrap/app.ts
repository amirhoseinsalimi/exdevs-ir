import * as express from 'express';
import { join } from 'path';

// @ts-ignore
const app = express();
const cwd = process.cwd();

// view engine setup
app.set('views', join(cwd, 'resources/views'));
app.set('view engine', 'pug');

export default app;
