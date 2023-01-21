/* eslint no-use-before-define: 0, func-names: 0 */

$(() => {
  const config = {
    transitionTime: 700,
    progressBarCompletionTime: '15s', // seconds
  };

  let currentProgress = 0;
  let teamsInfo;
  let currentTeam = 0;
  let mobileMenuStatus = false;
  let currentPage = 'Home';
  const fragId = window.location.hash.substr(1);
  const D = document;

  $.ajax({
    url: '/api/team',
    method: 'get',
    dataType: 'json',
    timeout: 3000,
    beforeSend: () => {},
    statusCode: {
      200: (data) => {
        teamsInfo = data.teams;
        changeTeam(0);

        $('.loader-container')
          .fadeOut(config.transitionTime, () => {
            $('.main-container')
              .fadeIn(config.transitionTime, () => {})
              .removeClass('d-none');
          })
          .addClass('d-none');

        if (fragId === 'home') {
          navigateToHome();
        } else if (fragId === 'team') {
          navigateToMeetTheTeam();
        } else if (fragId === 'contact') {
          navigateToContact();
        } else {
          navigateToHome();
        }
      },
      404: () => {
        window.location.replace('/server-error');
        console.log('404');
      },
    },
    error: () => {
      window.location.href = '/server-error';
      console.log('500');
    },
  });

  const $teamName = $('.team-name');
  const $teamMotto = $('.team-motto');
  const $teamDescription = $('.team-description');
  const $progressBar = $('.progress-bar');
  const $exceptionHeader = $('.exception-header');

  const $mobileMenuIndicator = $('.mobile-menu-indicator');

  const $allInfo = $('.team-name, .team-motto, .team-description, .team-icon');

  setInterval(() => {
    currentProgress += 1;

    $('#dynamic')
      .css('width', `${currentProgress}%`)
      .attr('aria-valuenow', currentProgress);

    if (currentProgress >= 100) {
      changeTeam(
        ++currentTeam >= teamsInfo.length ? (currentTeam = 0) : currentTeam,
      );
      currentProgress = 0;
    }
  }, parseFloat(config.progressBarCompletionTime) * 10);

  const changeTeam = (currentTeamIndex) => {
    const team = teamsInfo[currentTeamIndex];

    $allInfo.fadeOut(500, function () {
      $teamName.html(`<h5>${team.name}</h5>`);
      $teamMotto.html(`<p>${team.motto}</p>`);
      $teamDescription.html(`<p>${team.description}</p>`);

      $('.motto-box .header img').attr('src', team.icon);
      $('#dynamic').css('width', `${0}%`);

      $(this).fadeIn(config.transitionTime);

      if (team.name === 'Web development') {
        $exceptionHeader
          .removeClass('text--app')
          .removeClass('text--server')
          .addClass('text--web');
        $teamName
          .html(team.name)
          .removeClass('text--app')
          .removeClass('text--server')
          .addClass('text--web');
        $teamMotto
          .html(team.motto)
          .removeClass('text--app')
          .removeClass('text--server')
          .addClass('text--web');
        $progressBar
          .removeClass('bg--app')
          .removeClass('bg--server')
          .addClass('bg--web');
      } else if (team.name === 'Application development') {
        $exceptionHeader
          .removeClass('text--server')
          .removeClass('text--web')
          .addClass('text-app');
        $teamName
          .html(team.name)
          .removeClass('text--server')
          .removeClass('text--web')
          .addClass('text--app');
        $teamMotto
          .html(team.motto)
          .removeClass('text--server')
          .removeClass('text--web')
          .addClass('text--app');
        $progressBar
          .removeClass('bg--server')
          .removeClass('bg--web')
          .addClass('bg--app');
      } else if (team.name === 'Server development') {
        $exceptionHeader
          .removeClass('text--web')
          .removeClass('text--app')
          .addClass('text--server');
        $teamName
          .html(team.name)
          .removeClass('text--web')
          .removeClass('text--app')
          .addClass('text--server');
        $teamMotto
          .html(team.motto)
          .removeClass('text--web')
          .removeClass('text--app')
          .addClass('text--server');
        $progressBar
          .removeClass('bg--web')
          .removeClass('bg--app')
          .addClass('bg--server');
      }
    });
  };

  const main = document.getElementsByClassName('home-container')[0];

  main.addEventListener('touchstart', handleXTouchStart, false);
  main.addEventListener('touchmove', handleXTouchMove, false);

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleXTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleXTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;

    const xDiff = xDown - xUp;

    if (xDiff > 0) {
      currentProgress = 0;
      currentTeam -= 1;
      changeTeam(currentTeam <= -1 ? (currentTeam = 2) : currentTeam);
    } else {
      currentProgress = 0;
      currentTeam += 1;
      changeTeam(currentTeam >= 3 ? (currentTeam = 0) : currentTeam);
    }

    xDown = null;
  }

  D.getElementById('contact-form').addEventListener('submit', () => {
    const inputs = D.getElementsByClassName('form-control');

    Array.prototype.forEach.call(inputs, (input) => {
      console.log(input.value.replace(/(<([^>]+)>)/gi, ''));
    });
  });

  $('.switch-team-arrow.prev').on('click', () => {
    currentProgress = 0;
    currentTeam -= 1;
    changeTeam(currentTeam <= -1 ? (currentTeam = 2) : currentTeam);
  });

  $('.switch-team-arrow.next').on('click', () => {
    currentProgress = 0;
    currentTeam -= 1;
    changeTeam(currentTeam >= 3 ? (currentTeam = 0) : currentTeam);
  });

  $('#discardForm, .home-link')
    .on('click', () => {
      navigateToHome();
    });

  $('.meet-team-link')
    .on('click', () => {
      navigateToMeetTheTeam();
    });

  $('.contact-link')
    .on('click', () => {
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
    $('.mobile-menu').addClass('open');
    $('.container-fluid.main-container').addClass('overlayed');
    $('body').css('overflow-y', 'hidden');
  };

  const closeMobileMenu = () => {
    $('.ham.hamRotate.ham8').removeClass('active');

    $('.mobile-menu').removeClass('open');
    $('.container-fluid.main-container').removeClass('overlayed');
    $('body').css('overflow-y', 'auto');
  };

  $mobileMenuIndicator.on('click', () => {
    if (!mobileMenuStatus) {
      openMobileMenu();

      $('.home-container, .meet-team-container, .contact-container').fadeOut(0);
    } else {
      closeMobileMenu();

      if (currentPage === 'Home') {
        $('.home-container').fadeIn(0);
      } else if (currentPage === 'Meet the Team') {
        $('.meet-team-container').fadeIn(0);
      } else if (currentPage === 'Contact') {
        $('.contact-container').fadeIn(0);
      }
    }

    toggleMobileMenu();
  });

  const navigateToHome = () => {
    if (currentPage === 'Meet the Team') {
      $('.contact-container').hide();
      $('.meet-team-container').fadeOut(config.transitionTime, () => {
        $('.home-container').fadeIn(config.transitionTime);
        $('.meet-team').hide();
      });
    } else {
      $('.meet-team-container').hide();
      $('.contact-container').fadeOut(config.transitionTime, () => {
        $('.home-container').fadeIn(config.transitionTime);
        $('.contact-team').hide();
      });
    }

    $('.contact-link, .meet-team-link').removeClass('active');
    $('.home-link').addClass('active');

    window.location.hash = '';
    currentPage = 'Home';
    mobileMenuStatus = false;
    closeMobileMenu();
  };

  const navigateToMeetTheTeam = () => {
    if (currentPage === 'Contact') {
      $('.home-container').hide();
      $('.contact-container').fadeOut(config.transitionTime, () => {
        $('.meet-team-container')
          .removeClass('d-none')
          .fadeIn(config.transitionTime, () => {
            $('.contact-container').hide();
          });
      });
    } else {
      $('.contact-container').hide();
      $('.home-container').fadeOut(config.transitionTime, () => {
        $('.meet-team-container')
          .removeClass('d-none')
          .fadeIn(config.transitionTime, () => {
            $('.home-container').hide();
          });
      });
    }

    $('.contact-link, .home-link').removeClass('active');
    $('.meet-team-link').addClass('active');

    window.location.hash = 'team';
    currentPage = 'Meet the Team';
    mobileMenuStatus = false;
    closeMobileMenu();
  };

  const navigateToContact = () => {
    if (currentPage === 'Home') {
      $('.meet-team-container').hide();
      $('.home-container').fadeOut(config.transitionTime, () => {
        $('.contact-container')
          .removeClass('d-none')
          .fadeIn(config.transitionTime);
        $('.home-container').hide();
      });
    } else {
      $('.home-container').hide();
      $('.meet-team-container').fadeOut(config.transitionTime, () => {
        $('.contact-container')
          .removeClass('d-none')
          .fadeIn(config.transitionTime);
        $('.meet-team-container').hide();
      });
    }

    $('.home-link, .meet-team-link').removeClass('active');
    $('.contact-link').addClass('active');

    window.location.hash = 'contact';
    currentPage = 'Contact';
    mobileMenuStatus = false;
    closeMobileMenu();
  };

  const discardForm = () => {
    $('.contact-form').trigger('reset');
  };
});
