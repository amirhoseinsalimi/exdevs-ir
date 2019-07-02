let express = require('express'),
    router = express.Router()
    fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  const file = `${__dirname}/app.apk`;
  res.setHeader('Content-Type', 'application/apk');
  res.setHeader('Content-disposition', 'attachment; filename=app.apk');
  res.download('../app.apk');
});

module.exports = router;
