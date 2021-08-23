import { NextFunction, Request, Response } from 'express';

export default function authenticate(req: Request, res: Response, next: NextFunction) {
  return req.session.username ? next() : res.redirect('/admin');
};
