import { NextFunction, Request, Response } from 'express';
import app from '../app/middleware';
import { HttpError } from 'http-errors';
import { router } from './index';

router.get('/', (req: Request, res: Response) => {
  res.status(500).render('500');
});

app.use((req: Request, res: Response) => {
  res.status(404);
  res.render('404');
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('500');
});
