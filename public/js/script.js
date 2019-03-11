'use strict';

$(function () {

    /**
     * Objects representing all possible configuration
     * @type {{transitionTime: number, progreesBarCompletionTime: string}}
     */
    const config = {
        transitionTime: 700,
        progreesBarCompletionTime: "10s", // seconds
    };

    let currentProgress = 0,
        currentTeam = 0,
        mobileMenuStatus = false;

    let teamsInfo = [
        {
            "name": "Web development",
            "description": "Molestias laborum neque distinctio nihil. Culpa reiciendis commodi nostrum et cupiditate in. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint! Debitis blanditiis adipisci excepturi animi totam sint esse cumque.Molestias laborum neque distinctio nihil. Culpa reiciendis commodi nostrum et cupiditate in. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint! Debitis blanditiis adipisci excepturi animi totam sint esse cumque.",
            "motto": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "color": "#f0db4f",
            "icon": "thumbs/web.svg"
        },
        {
            "name": "Application development",
            "description": "Debitis blanditiis adipisci excepturi animi totam sint esse cumque... Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi nostrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odio numquam perspiciatis, nemo, quasi vel quidem, sit beatae molestias laborum neque distinctio nihil. Culpa reiciendis commodi nostrum et cupiditate in. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint!",
            "motto": "Harum quod praesentium reiciendis tempore excepturi animi totam",
            "color": "#4ff05f",
            "icon": "thumbs/app.svg"
        },
        {
            "name": "Game development",
            "description": "Voluptates odit iure natus sint! Imque exercitationem dignissimos, quibusdam ipsa nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi nostrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odio numquam perspiciatis, nemo, quasi vel quidem, cupiditate in. Por lome toe. Iste nostrum omnis.",
            "motto": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "color": "#f04f4f",
            "icon": "thumbs/game.svg"
        },
        {
            "name": "Server development",
            "description": "Postrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor, pet cupiditate in. Lorem ipsum dolor, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint! Debitis blanditiis adipisci excepturi animi totam sint esse, cumque exercitationem dignissimos, quibusdam ipsa nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi!!",
            "motto": "Debitis blanditiis adipisci excepturi excepturi",
            "color": "#4f8af0",
            "icon": "thumbs/server.svg"
        },

    ];

    /**
     * jQuery elements
     * @type {JQuery<HTMLElement> | jQuery | HTMLElement}
     */
    const $teamName = $('.team-name'),
        $teamMotto = $('.team-motto'),
        $teamDescription = $('.team-description'),
        $progressBar = $('.progress-bar'),
        $ioExceptionHeader = $('.io-exception-header');

    const $mobileMenuIndicator = $(".mobile-menu-indicator"),
        $hr1 = $("hr:nth-child(1)"),
        $hr2 = $("hr:nth-child(2)"),
        $hr3 = $("hr:nth-child(3)");

    const $allInfo = $('.team-name, .team-motto, .team-description');

    /**
     * Execute the function each `config.progreesBarCompletionTime * 10` millis
     */
    setInterval(function () {
        currentProgress += 1;

        $("#dynamic")
            .css("width", currentProgress + "%")
            .attr("aria-valuenow", currentProgress);

        if (currentProgress >= 106) {
            changeTeam(++currentTeam >= 4 ? currentTeam = 0 : currentTeam);
            currentProgress = -6;
        }
    }, parseFloat(config.progreesBarCompletionTime) * 10);

    /**
     * Update the content depending on current team
     * @param currentTeam
     */
    const changeTeam = (currentTeam) => {
        const team = teamsInfo[currentTeam];

        $allInfo.fadeOut(500, function () {
            $teamName.html(`<h5>${team["name"]}</h5>`);
            $teamMotto.html(`<p>${team["motto"]}</p>`);
            $teamDescription.html(`<p>${team["description"]}</p>`);

            $('.team-icon').attr("data", team["icon"]);
            $("#dynamic").css("width", `${0}%`);

            $(this).fadeIn(config.transitionTime);

            if (currentTeam === 0) {
                $ioExceptionHeader.removeClass('text-app').removeClass("text-server").addClass("text-web");
                $teamName.html(team["name"]).removeClass('text-app').removeClass("text-server").addClass("text-web");
                $teamMotto.html(team["motto"]).removeClass('text-app').removeClass("text-server").addClass("text-web");
                $progressBar.removeClass("bg-app").removeClass("bg-server").addClass("bg-web");
            } else if (currentTeam === 1) {
                $ioExceptionHeader.removeClass('text-game').removeClass("text-web").addClass("text-app");
                $teamName.html(team["name"]).removeClass('text-game').removeClass("text-web").addClass("text-app");
                $teamMotto.html(team["motto"]).removeClass('text-game').removeClass("text-web").addClass("text-app");
                $progressBar.removeClass("bg-game").removeClass("bg-web").addClass("bg-app");
            } else if (currentTeam === 2) {
                $ioExceptionHeader.removeClass('text-server').removeClass("text-app").addClass("text-game");
                $teamName.html(team["name"]).removeClass('text-server').removeClass("text-app").addClass("text-game");
                $teamMotto.html(team["motto"]).removeClass('text-server').removeClass("text-app").addClass("text-game");
                $progressBar.removeClass("bg-server").removeClass("bg-app").addClass("bg-game");
            } else if (currentTeam === 3) {
                $ioExceptionHeader.removeClass('text-web').removeClass("text-game").addClass("text-server");
                $teamName.html(team["name"]).removeClass('text-web').removeClass("text-game").addClass("text-server");
                $teamMotto.html(team["motto"]).removeClass('text-web').removeClass("text-game").addClass("text-server");
                $progressBar.removeClass("bg-web").removeClass("bg-game").addClass("bg-server");
            }
        });

    };

    /**
     * jQuery event handlers
     */

    $('span .left-arrow').on('click', function () {
        currentProgress = 0;
        changeTeam(--currentTeam <= -1 ? currentTeam = 3 : currentTeam);
    });

    $('span .right-arrow').on('click', function () {
        currentProgress = 0;
        changeTeam(++currentTeam >= 4 ? currentTeam = 0 : currentTeam);
    });

    $('#discardForm, .home-link').on("click", function () {
        navigateToHome();
    });

    $('.projects-link').on("click", function () {
        navigateToProjects();
    });

    $('.contact-link').on("click", function () {
        navigateToContact();
    });

    $("form a").on("click", () => {
        setTimeout(function() {
            discardForm();
        }, config.transitionTime);
    });

    const toggleMobileMenu = function () {
        mobileMenuStatus = !mobileMenuStatus;
        return mobileMenuStatus;
    };

    const openMobileMenu = () => {
        $hr1.css({
            "transform": "rotate(45deg)",
            "top": "25px",
        });

        $hr3.css({
            "transform": "rotate(-45deg)",
            "top": "25px",
        });

        $('.mobile-menu').removeClass('d-none').addClass('d-block');
        $('body').css("overflow-y", "hidden");

        $hr2.fadeOut(200);
    };

    const closeMobileMenu = () => {
        $hr2.fadeIn();

        $hr1.css({
            "transform": "rotate(0deg)",
            "width": "80%",
            "top": "15px",
        });

        $hr3.css({
            "transform": "rotate(0deg)",
            "width": "80%",
            "top": "35px",
        });

        $hr2.css({
            "top": "25px",
            "right": "10%",
        });

        $('.mobile-menu').removeClass('d-block').addClass('d-none');
        $('body').css("overflow-y", "auto");
    };

    /**
     *
     * @type {JQuery<HTMLElement> | jQuery | HTMLElement}
     */

    $mobileMenuIndicator.on('click', () => {
        if   (!mobileMenuStatus) openMobileMenu();
        else                     closeMobileMenu();

        toggleMobileMenu();
    });

    /**
     * Hide "Projects" and "Contact" sections and displays "Home"
     */
    const navigateToHome = () => {
        $(".contact-container, .projects-container").fadeOut(config.transitionTime, function () {
            $(".home-container").fadeIn(config.transitionTime);
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
        $(".home-container, .contact-container").fadeOut(config.transitionTime, function () {
            $(".projects-container").removeClass("d-none").fadeIn(config.transitionTime);
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
        $(".home-container, .projects-container").fadeOut(config.transitionTime, function () {
            $(".contact-container").removeClass("d-none").fadeIn(config.transitionTime);
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
        $('.contact-form').trigger("reset");
    }

});