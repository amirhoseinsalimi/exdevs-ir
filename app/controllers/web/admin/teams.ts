import * as express from 'express';

import authenticate from '../../../middleware/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.render('admin/teams');
});

export default router;
