const express = require('express');

const router = express.Router();
const { incrementIndexCounter } = require('../counter');
const shuffleArray = require('./../my_modules/shuffle-array');

/* GET home page. */
router.get('/', (req, res) => {
  const members = [
    {
      name: 'Amir Hosein Salimi',
      position: 'Front-end Developer',
      text: 'Constantly developing his skills, never satisfies of what he knows. Very precise!',
      img: 'img/salimi.jpeg',
      linkedIn: 'amirhoseinsalimi/',
      twitter: 'ahoseinsalimi',
      email: 'st_ah_salimi@azad.ac.ir',
      telegram: 'amirhoseinsalimii',
    },
    {
      name: 'Hamidreza Bayat',
      position: 'Mobile Developer',
      text: 'A true geek, great at developing software in a blink.',
      img: 'img/bayat.jpeg',
      linkedIn: 'hamidr3zabayat/',
      twitter: 'HrBDev',
      email: 'st_hr_bayat@azad.ac.ir',
      telegram: 'HrBD3v',
    },
    {
      name: 'Milad Karimiyan',
      position: 'Back-end Developer',
      text: 'Dreaming big is what he was born for. Also an ocean of knowledge in software development.',
      img: 'img/karimiyan.jpeg',
      linkedIn: 'milad-karimiyan-0337a8a9/',
      twitter: 'MiladKarimiyan',
      email: 'st_m_karimian@azad.ac.ir',
      telegram: 'mikdev',
    },
    {
      name: 'Fatemeh Akhlaghi',
      position: 'Mobile Developer',
      text: 'Happy all the time, works passionately alongside her co-workers.',
      img: 'img/akhlaghi.jpg',
      linkedIn: 'fatemeh-akhlaghi-6a211615b/',
      twitter: 'ftad3v',
      email: 'akhlaghi.fatemeh@gmail.com',
      telegram: 'FtaDev',
    },
    {
      name: 'Marzieh Abedinia',
      position: 'Mobile Developer',
      text: 'The quite girl of the team, doesn\'t waste even a minute!',
      img: 'img/abedinia.jpeg',
      linkedIn: 'marzieh-abedinia-4a71a2184/',
      twitter: '',
      email: 'm.abedinia1998@gmail.com',
      telegram: 'm_abedinia',
    },
    {
      name: 'Ali Geramian Rad',
      position: 'UI Designer',
      text: 'Delivers tasks in time, surprises his co-workers every time showcases his works.',
      img: 'img/geramian.jpeg',
      linkedIn: 'ali-geramian-rad-1354b3122',
      twitter: '',
      email: 'a.geramian@yahoo.com',
      telegram: 'Ali_GR',
    },
    {
      name: 'Shahryar Hajian',
      position: 'Researcher',
      text: 'Digs into whatever the topic is, finds solution for every problem!',
      img: 'img/hajian.jpg',
      linkedIn: 'shahryar-hajian-209a50151/',
      twitter: '',
      email: 'Hajian.rh@gmail.com',
      telegram: 'Shaha_H',
    },
    {
      name: 'Mahboubeh Seyedpour',
      position: 'Operations Manager',
      text: 'Productive in every situation, doesn\'t let a task overdue, kind to everybody she meets!',
      img: 'img/seyedpour.png',
      linkedIn: '/mahboubeh-sadat-seyedpour-676aa5190/',
      twitter: '',
      email: 'mahboobeh.seyedpour@gmail.com',
      telegram: 'spr_m_s',
    },
    {
      name: 'Amir Hosein Asgari',
      position: 'Front-end Developer',
      text: 'Gets the work done, no matter what it is and why. Does the big work tomorrow!',
      img: 'img/asgari.png',
      linkedIn: '/amiagr/',
      twitter: 'https://twitter.com/ami97agr',
      email: 'amirhosseinasgari@hotmail.com',
      telegram: 'amiagr',
    },
    {
      name: 'Saeed Erfani',
      position: 'Mobile Developer',
      text: 'Team work is his shining ring; Very collaborative and true mentor.',
      img: 'img/s_erfani.png',
      linkedIn: '/saeed-erfani/',
      twitter: '',
      email: 'saeederfani75@gmail.com',
      telegram: '/s_erfani96',
    },
  ];

  res.status(200);
  res.render('index', { members: shuffleArray(members) });

  incrementIndexCounter();
});

module.exports = router;
