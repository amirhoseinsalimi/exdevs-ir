import * as express from 'express';

const router = express.Router();
import app from '../app/middleware';

import './pages';
import './api';

export { app, router };
