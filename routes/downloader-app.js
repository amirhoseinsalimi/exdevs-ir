const express = require('express');

const router = express.Router();
const useragent = require('useragent');
// const { incrementDownloadLinkCounter } = require('../counter');

useragent(true);


router.get('/', (req, res) => {
  const agent = useragent.parse(req.headers['user-agent']);

  if (agent.os === 'iOS') {
    res.redirect('https://timeset-web.firebaseapp.com');
  } else {
    res.set({ 'Content-Type': 'application/vnd.android.package-archive' });
    res.download('app.apk');
  }

  // incrementDownloadLinkCounter();
});

module.exports = router;
