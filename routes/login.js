let express = require('express'),
    router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
  res.send('login form');
});

module.exports = router;
