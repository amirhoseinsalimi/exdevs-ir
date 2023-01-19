const TABLE_NAME = 'teams';

exports.seed = async (knex) => {
  await knex(TABLE_NAME).del();

  await knex(TABLE_NAME).insert([
    {
      id: 1,
      name: 'Web development',
      description:
        'The web is an essential part of every successful product nowadays. Our web'
        + ' division, having enthusiastic developers, provides you each website and web application'
        + '  you want with exemplary quality. We use high-demand frameworks and the latest'
        + ' technologies as our main tool to bring this achievement. Our specialty in front-end and'
        + '  back-end JavaScript frameworks gives us the ability to build robust full-stack web apps'
        + '  with an astonishing performance. Long story short, we do our best to always be on the'
        + '  edge of the web development world.',
      color: '#f0db4f',
    },
    {
      id: 2,
      name: 'Application development',
      description:
        'Want to expand your business? Maybe you need a mobile app! Our experienced'
        + ' developers at our mobile division, are capable of doing anything possible in the'
        + " industry. Having experience in Java, Kotlin, Flutter, there's no obstacle for us to go"
        + ' beyond the boundaries. We build your desired Android or iOS app with the quality, fewer'
        + ' young teams would be capable. With the knowledge of a bunch of technologies, we always'
        + " choose the right one for the job, and it wouldn't be exaggerating to say that nothing is"
        + ' impossible for us.',
      color: '#a4c639',
    },
    {
      id: 3,
      name: 'Server development',
      description:
        'The spirit of every mobile app, website or a web service is server-side.'
        + ' PHP, Elixir, Python are just a few tools we have in our hands, but our real power'
        + " doesn't come from these tools, it comes from our mind! We know all the feasible"
        + ' features your product needs, so you can trust us on all kinds of projects, whether it is'
        + " a RESTful API or a back-end for a website, we do the correct job. We've also come a"
        + ' long way in designing databases and MySQL/MariaDB, MongoDB were our best friends during'
        + " our journey. We know that success isn't achieved by accident, so we don't wait for it,"
        + ' we chase it!',
      color: '#777bb3',
    },
  ]);
};
