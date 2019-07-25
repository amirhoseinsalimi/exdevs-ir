const express = require('express');

const router = express.Router();

/* English content */
router.get('/', (req, res) => {
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const mainContent = [
    {
      name: 'Web development',
      description: 'lalalla The web is an essential part of every successful product nowadays. Our web'
      + ' division, having enthusiastic developers, provides you each website and web application'
      + '  you want with exemplary quality. We use high-demand frameworks and the latest'
      + ' technologies as our main tool to bring this achievement. Our specialty in front-end and'
      + '  back-end JavaScript frameworks gives us the ability to build robust full-stack web apps'
      + '  with an astonishing performance. Long story short, we do our best to always be on the'
      + '  edge of the web development world.',
      motto: 'Always deliver more than expected',
      color: '#f0db4f',
      icon: 'thumbs/web.svg',
    },
    {
      name: 'Application development',
      description: 'Want to expand your business? Maybe you need a mobile app! Our experienced'
      + ' developers at our mobile division, are capable of doing anything possible in the'
      + ' industry. Having experience in Java, Kotlin, Flutter, there\'s no obstacle for us to go'
      + ' beyond the boundaries. We build your desired Android or iOS app with the quality, fewer'
      + ' young teams would be capable. With the knowledge of a bunch of technologies, we always'
      + ' choose the right one for the job, and it wouldn\'t be exaggerating to say that nothing is'
      + ' impossible for us.',
      motto: 'Success is not a final point, it\'s a road',
      color: '#4ff05f',
      icon: 'thumbs/app.svg',
    },
    {
      name: 'Server development',
      description: 'The spirit of every mobile app, website or a web service is server-side.'
      + ' PHP, Elixir, Python are just a few tools we have in our hands, but our real power'
      + ' doesn\'t come from these tools, it comes from our mind! We know all the feasible'
      + ' features your product needs, so you can trust us on all kinds of projects, whether it is'
      + ' a RESTful API or a back-end for a website, we do the correct job. We\'ve also come a'
      + ' long way in designing databases and MySQL/MariaDB, MongoDB were our best friends during'
      + ' our journey. We know that success isn\'t achieved by accident, so we don\'t wait for it,'
      + ' we chase it!',
      motto: 'Use the right tool, for the right job, in the right way!',
      color: '#4f8af0',
      icon: 'thumbs/server.svg',
    },
  ];

  const members = [
    {
      name: 'Amir Hosein Salimi',
      position: 'Front-end Developer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: 'img/salimi.jpeg',
      linkedIn: 'amirhoseinsalimi/',
      twitter: 'ahoseinsalimi',
      email: 'st_ah_salimi@azad.ac.ir',
      telegram: 'amirhoseinsalimii',
    },
    {
      name: 'Hamidreza Bayat',
      position: 'Mobile Developer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: 'img/bayat.jpeg',
      linkedIn: 'hamidr3zabayat/',
      twitter: 'HrBDev',
      email: 'st_hr_bayat@azad.ac.ir',
      telegram: 'HrBD3v',
    },
    {
      name: 'Milad Karimiyan',
      position: 'Back-end Developer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: 'img/karimiyan.jpeg',
      linkedIn: 'milad-karimiyan-0337a8a9/',
      twitter: 'milad_karimiyan.kdev',
      email: 'st_m_karimian@azad.ac.ir',
      telegram: 'mikdev',
    },
    {
      name: 'Fatemeh Akhlaghi',
      position: 'Mobile Developer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: 'img/akhlaghi.jpg',
      link: 'fatemeh-akhlaghi-6a211615b/',
      twitter: 'ftad3v',
      email: '',
      telegram: 'FtaDev',
    },
    {
      name: 'Marzieh Abedinia',
      position: 'Mobile Developer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: 'img/abedinia.jpg',
      linkedIn: 'marzieh-abedinia-4a71a2184/',
      twitter: '',
      email: '',
      telegram: 'm_abedinia',
    },
  ];

  const result = {
    mainContent: shuffle(mainContent),
    members: shuffle(members),
  };

  res.json(result);
});

module.exports = router;