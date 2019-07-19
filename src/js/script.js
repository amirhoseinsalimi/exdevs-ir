/* eslint no-use-before-define: 0, no-plusplus: 0, func-names: 0 */

$(() => {
  /**
   * Objects representing all possible configuration
   * @type {{transitionTime: number, progressBarCompletionTime: string}}
   */
  const config = {
    transitionTime: 700,
    progressBarCompletionTime: '10s', // seconds
  };

  let currentProgress = 0;
  let currentTeam = 0;
  let mobileMenuStatus = false;

  const teamsInfo = [
    {
      name: 'Web development',
      description: 'The web is an essential part of every successful product nowadays. Our web'
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

  /**
   * jQuery elements
   * @type {JQuery<HTMLElement> | jQuery | HTMLElement}
   */
  const $teamName = $('.team-name');
  const $teamMotto = $('.team-motto');
  const $teamDescription = $('.team-description');
  const $progressBar = $('.progress-bar');
  const $ioExceptionHeader = $('.io-exception-header');
  const $memberCards = $('.member-card');

  const $mobileMenuIndicator = $('.mobile-menu-indicator');
  const $hr1 = $('hr:nth-child(1)');
  const $hr2 = $('hr:nth-child(2)');
  const $hr3 = $('hr:nth-child(3)');

  const $allInfo = $('.team-name, .team-motto, .team-description');

  /**
   * Execute the function each `config.progressBarCompletionTime * 10` millis
   */
  setInterval(() => {
    currentProgress += 1;

    $('#dynamic')
      .css('width', `${currentProgress}%`)
      .attr('aria-valuenow', currentProgress);

    if (currentProgress >= 106) {
      changeTeam(++currentTeam >= 3 ? currentTeam = 0 : currentTeam);
      currentProgress = -6;
    }
  }, parseFloat(config.progressBarCompletionTime) * 10);

  /**
   * Update the content depending on current team
   * @param currentTeam
   */
  const changeTeam = (currentTeam) => {
    const team = teamsInfo[currentTeam];

    $allInfo.fadeOut(500, function () {
      $teamName.html(`<h5>${team.name}</h5>`);
      $teamMotto.html(`<p>${team.motto}</p>`);
      $teamDescription.html(`<p>${team.description}</p>`);

      $('.motto-box .header img').attr('src', team.icon);
      $('#dynamic').css('width', `${0}%`);

      $(this).fadeIn(config.transitionTime);

      if (currentTeam === 0) {
        $ioExceptionHeader.removeClass('text-app').removeClass('text-server').addClass('text-web');
        $teamName.html(team.name).removeClass('text-app').removeClass('text-server').addClass('text-web');
        $teamMotto.html(team.motto).removeClass('text-app').removeClass('text-server').addClass('text-web');
        $progressBar.removeClass('bg-app').removeClass('bg-server').addClass('bg-web');
      } else if (currentTeam === 1) {
        $ioExceptionHeader.removeClass('text-server').removeClass('text-web').addClass('text-app');
        $teamName.html(team.name).removeClass('text-server').removeClass('text-web').addClass('text-app');
        $teamMotto.html(team.motto).removeClass('text-server').removeClass('text-web').addClass('text-app');
        $progressBar.removeClass('bg-server').removeClass('bg-web').addClass('bg-app');
      } else if (currentTeam === 2) {
        $ioExceptionHeader.removeClass('text-web').removeClass('text-app').addClass('text-server');
        $teamName.html(team.name).removeClass('text-web').removeClass('text-app').addClass('text-server');
        $teamMotto.html(team.motto).removeClass('text-web').removeClass('text-app').addClass('text-server');
        $progressBar.removeClass('bg-web').removeClass('bg-app').addClass('bg-server');
      }
    });
  };

  /**
   * jQuery event handlers
   */
  $memberCards.on('click', (e) => {
    window.open(e.target.closest('.member-card').getAttribute('link'));
  });

  $('span .left-arrow').on('click', () => {
    currentProgress = 0;
    changeTeam(--currentTeam <= -1 ? currentTeam = 2 : currentTeam);
  });

  $('span .right-arrow').on('click', () => {
    currentProgress = 0;
    changeTeam(++currentTeam >= 3 ? currentTeam = 0 : currentTeam);
  });

  $('#discardForm, .home-link').on('click', () => {
    navigateToHome();
  });

  $('.projects-link').on('click', () => {
    navigateToProjects();
  });

  $('.contact-link').on('click', () => {
    navigateToContact();
  });

  $('form a').on('click', () => {
    setTimeout(() => {
      discardForm();
    }, config.transitionTime);
  });

  const toggleMobileMenu = function () {
    mobileMenuStatus = !mobileMenuStatus;
    return mobileMenuStatus;
  };

  const openMobileMenu = () => {
    $hr1.css({
      transform: 'rotate(45deg)',
      top: '25px',
    });

    $hr3.css({
      transform: 'rotate(-45deg)',
      top: '25px',
    });

    $('.mobile-menu').removeClass('d-none').addClass('d-block');
    $('body').css('overflow-y', 'hidden');

    $hr2.fadeOut(200);
  };

  const closeMobileMenu = () => {
    $hr2.fadeIn();

    $hr1.css({
      transform: 'rotate(0deg)',
      width: '80%',
      top: '15px',
    });

    $hr3.css({
      transform: 'rotate(0deg)',
      width: '80%',
      top: '35px',
    });

    $hr2.css({
      top: '25px',
      right: '10%',
    });

    $('.mobile-menu').removeClass('d-block').addClass('d-none');
    $('body').css('overflow-y', 'auto');
  };

  /**
   *
   * @type {JQuery<HTMLElement> | jQuery | HTMLElement}
   */

  $mobileMenuIndicator.on('click', () => {
    if (!mobileMenuStatus) {
      openMobileMenu();
      $('.home-container, .contact-container').fadeOut(0);
    } else {
      closeMobileMenu();
      $('.home-container, .contact-container').fadeIn(0);
    }

    toggleMobileMenu();
  });

  /**
   * Hide "Projects" and "Contact" sections and displays "Home"
   */
  const navigateToHome = () => {
    $('.contact-container, .projects-container').fadeOut(config.transitionTime, () => {
      $('.home-container').fadeIn(config.transitionTime);
    });
    $('.contact-link, .projects-link').removeClass('active');
    $('.home-link').addClass('active');

    mobileMenuStatus = false;
    closeMobileMenu();
  };

  /**
   * Hide "Projects" and "Contact" sections and displays "Home"
   */
  const navigateToProjects = () => {
    $('.home-container, .contact-container').fadeOut(config.transitionTime, () => {
      $('.projects-container').removeClass('d-none').fadeIn(config.transitionTime);
    });
    $('.contact-link, .home-link').removeClass('active');
    $('.projects-link').addClass('active');

    mobileMenuStatus = false;
    closeMobileMenu();
  };

  /**
   * Hide "Projects" and "Contact" sections and displays "Home"
   */
  const navigateToContact = () => {
    $('.home-container, .projects-container').fadeOut(config.transitionTime, () => {
      $('.contact-container').removeClass('d-none').fadeIn(config.transitionTime);
    });
    $('.home-link, .projects-link').removeClass('active');
    $('.contact-link').addClass('active');

    mobileMenuStatus = false;
    closeMobileMenu();
  };

  /**
   * Discard the form - Used when user clicks on the "Discard" button
   */
  const discardForm = () => {
    $('.contact-form').trigger('reset');
  };
});
