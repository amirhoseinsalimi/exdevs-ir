export default function authenticate(req, res, next) {
  return req.session.username ? next() : res.redirect('/admin');
};
