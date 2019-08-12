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


  /**
   * Global variables
   */
  let currentProgress = 0;
  let teamsInfo;
  let members;
  let currentTeam = 0;
  let mobileMenuStatus = false;
  let currentPage = 'Home';
  const fragId = window.location.hash.substr(1);


  $.ajax({
    url: '/get-content',
    method: 'get',
    dataType: 'json',
    timeout: 3000,
    beforeSend: () => {

    },
    statusCode: {
      200: (data) => {
        teamsInfo = data.mainContent;
        changeTeam(0);
        members = data.members;

        generateMemberCards(members);

        $('.loader-container').fadeOut(config.transitionTime, () => {
          $('.main-container').fadeIn(config.transitionTime, () => {
            // Nothing to do
          }).removeClass('d-none');
        }).addClass('d-none');

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


  /**
   * jQuery elements
   * @type {JQuery<HTMLElement> | jQuery | HTMLElement}
   */
  const $teamName = $('.team-name');
  const $teamMotto = $('.team-motto');
  const $teamDescription = $('.team-description');
  const $progressBar = $('.progress-bar');
  const $ioExceptionHeader = $('.io-exception-header');

  const $mobileMenuIndicator = $('.mobile-menu-indicator');
  const $hr1 = $('hr:nth-child(1)');
  const $hr2 = $('hr:nth-child(2)');
  const $hr3 = $('hr:nth-child(3)');

  const $allInfo = $('.team-name, .team-motto, .team-description, .team-icon');

  /**
   * Execute the function each `config.progressBarCompletionTime * 10` millis
   */
  setInterval(() => {
    currentProgress += 1;

    $('#dynamic')
      .css('width', `${currentProgress}%`)
      .attr('aria-valuenow', currentProgress);

    if (currentProgress >= 106) {
      changeTeam(++currentTeam >= teamsInfo.length ? currentTeam = 0 : currentTeam);
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

      if (team.name === 'Web development') {
        $ioExceptionHeader.removeClass('text-app').removeClass('text-server').addClass('text-web');
        $teamName.html(team.name).removeClass('text-app').removeClass('text-server').addClass('text-web');
        $teamMotto.html(team.motto).removeClass('text-app').removeClass('text-server').addClass('text-web');
        $progressBar.removeClass('bg-app').removeClass('bg-server').addClass('bg-web');
      } else if (team.name === 'Application development') {
        $ioExceptionHeader.removeClass('text-server').removeClass('text-web').addClass('text-app');
        $teamName.html(team.name).removeClass('text-server').removeClass('text-web').addClass('text-app');
        $teamMotto.html(team.motto).removeClass('text-server').removeClass('text-web').addClass('text-app');
        $progressBar.removeClass('bg-server').removeClass('bg-web').addClass('bg-app');
      } else if (team.name === 'Server development') {
        $ioExceptionHeader.removeClass('text-web').removeClass('text-app').addClass('text-server');
        $teamName.html(team.name).removeClass('text-web').removeClass('text-app').addClass('text-server');
        $teamMotto.html(team.motto).removeClass('text-web').removeClass('text-app').addClass('text-server');
        $progressBar.removeClass('bg-web').removeClass('bg-app').addClass('bg-server');
      }
    });
  };

  const generateMemberCards = (members) => {
    members.forEach((member) => {
      $('.members').append(`
        <div class="col-12 col-md-4 py-4 col-lg-3 my-2 mx-1 member-card">
          <img class="d-block mx-auto mb-3 profile-image" src="${member.img}" alt="Exception member" />
          <div class="text text-center">
            <span class="text-center">${member.name}</span>
            <br />
            <span class="small text-muted">${member.position}</span>
            <p style="font-size: 13px" class="text-left mb-3">
              ${member.text}            
            </p>
            
            <div class="d-flex justify-content-center">
              <a href="https://twitter.com/${member.twitter}" target="_blank" class="member-link twitter">
                <img src="icons/twitter.svg" alt="${member.name}-twitter">
              </a>
              <a href="https://www.linkedin.com/in/${member.linkedIn}" target="_blank" class="member-link linkedIn">
                <img src="icons/linkedin.svg" alt="${member.name}-linkedin">
              </a>
              <a href="https://t.me/${member.telegram}" target="_blank" class="member-link telegram">
                <img src="icons/telegram.svg" alt="${member.name}-telegram">
              </a>
              <a href="mailto:${member.email}" class="member-link email">
                <img src="icons/email.svg" alt="${member.name}-email">
              </a>
            </div>
          </div>
        </div>
    `);
    });
  };


  /**
   * jQuery event handlers
   */


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

  $('.meet-team-link').on('click', () => {
    navigateToMeetTheTeam();
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


  /**
   * Hide "Meet the Team" and "Contact" sections and display "Home"
   */
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


  /**
   * Hide "Home" and "Contact" sections and display "Meet the Team"
   */
  const navigateToMeetTheTeam = () => {
    if (currentPage === 'Contact') {
      $('.home-container').hide();
      $('.contact-container').fadeOut(config.transitionTime, () => {
        $('.meet-team-container').removeClass('d-none').fadeIn(config.transitionTime, () => {
          $('.contact-container').hide();
        });
      });
    } else {
      $('.contact-container').hide();
      $('.home-container').fadeOut(config.transitionTime, () => {
        $('.meet-team-container').removeClass('d-none').fadeIn(config.transitionTime, () => {
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


  /**
   * Hide "Home" and "Meet the Team" sections and display "Contact"
   */
  const navigateToContact = () => {
    if (currentPage === 'Home') {
      $('.meet-team-container').hide();
      $('.home-container').fadeOut(config.transitionTime, () => {
        $('.contact-container').removeClass('d-none').fadeIn(config.transitionTime);
        $('.home-container').hide();
      });
    } else {
      $('.home-container').hide();
      $('.meet-team-container').fadeOut(config.transitionTime, () => {
        $('.contact-container').removeClass('d-none').fadeIn(config.transitionTime);
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


  /**
   * Discard the form - Used when user clicks on the "Discard" button
   */
  const discardForm = () => {
    $('.contact-form').trigger('reset');
  };
});
