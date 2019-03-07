'use strict';

$(function () {
    $('.mobile-menu').css("display", "none");

    let currentProgress = 0,
        currentTeam = 0,
        clicks = false;

    let teamsInfo = [
        {
            "name": "<h5>Web development</h5>",
            "description": "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi nostrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odio numquam perspiciatis, nemo, quasi vel quidem, sit beatae molestias laborum neque distinctio nihil. Culpa reiciendis commodi nostrum et cupiditate in. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint! Debitis blanditiis adipisci excepturi animi totam sint esse cumque.</p>",
            "motto": "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>",
            "color": "#f0db4f",
            "icon": "thumbs/web.svg"
        },
        {
            "name": "<h5>Application development</h5>",
            "description": "<p>Debitis blanditiis adipisci excepturi animi totam sint esse cumque... Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi nostrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odio numquam perspiciatis, nemo, quasi vel quidem, sit beatae molestias laborum neque distinctio nihil. Culpa reiciendis commodi nostrum et cupiditate in. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint!</p>",
            "motto": "<p>Harum quod praesentium reiciendis tempore excepturi animi totam</p>",
            "color": "#4ff05f",
            "icon": "thumbs/app.svg"
        },
        {
            "name": "<h5>Game development</h5>",
            "description": "<p>Voluptates odit iure natus sint! Imque exercitationem dignissimos, quibusdam ipsa nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi nostrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odio numquam perspiciatis, nemo, quasi vel quidem, cupiditate in. Por lome toe. Iste nostrum omnis.</p>",
            "motto": "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>",
            "color": "#f04f4f",
            "icon": "thumbs/game.svg"
        },
        {
            "name": "<h5>Server development</h5>",
            "description": "<p>Postrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor, pet cupiditate in. Lorem ipsum dolor, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint! Debitis blanditiis adipisci excepturi animi totam sint esse, cumque exercitationem dignissimos, quibusdam ipsa nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi!!</p>",
            "motto": "<p>Debitis blanditiis adipisci excepturi excepturi</p>",
            "color": "#4f8af0",
            "icon": "thumbs/server.svg"
        },

    ];

    const $teamName = $('.team-name'),
        $teamMotto = $('.team-motto'),
        $teamDescription = $('.team-description'),
        $progressBar = $('.progress-bar'),
        $ioExceptionHeader = $('.io-exception-header');

    const $togglerContainer = $(".toggler-container"),
        $hrs = $('hr'),
        $hr1 = $("hr:nth-child(1)"),
        $hr2 = $("hr:nth-child(2)"),
        $hr3 = $("hr:nth-child(3)");

    const $allInfo = $('.team-name, .team-motto, .team-description');

    setInterval(function () {
        currentProgress += 1;

        $("#dynamic")
            .css("width", currentProgress + "%")
            .attr("aria-valuenow", currentProgress);

        if (currentProgress >= 100) {
            changeTeam(++currentTeam >= 4 ? currentTeam = 0 : currentTeam);
            currentProgress = 0;
        }
    }, 100);

    const changeTeam = (currentTeam) => {
        const team = teamsInfo[currentTeam];

        $allInfo.fadeOut(500, function(e) {
            $teamName.html(team["name"]);
            $teamMotto.html(team["motto"]);
            $teamDescription.html(team["description"]);

            $('.team-icon').attr("data", team["icon"]);
            $("#dynamic").css("width", `${0}%`);

            $(this).fadeIn(500);

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

    // const pause = milliseconds => {
    //     let dt = new Date();
    //     while ((new Date()) - dt <= milliseconds) { /* Do nothing */
    //     }
    // };

    $('span .left-arrow').on('click', function() {
        currentProgress = 0;
        changeTeam(--currentTeam <= -1 ? currentTeam = 3 : currentTeam);
    });

    $('span .right-arrow').on('click', function() {
        currentProgress = 0;
        changeTeam(++currentTeam >= 4 ? currentTeam = 0 : currentTeam);
    });

    $('#discardForm, .home-link').on("click", function() {
        $(".container:nth-child(2)").fadeOut(500, function() {
            $(".container:nth-child(1)").fadeIn(500);
        });
        $('.contact-link, .projects-link').removeClass('active');
        $('.home-link').addClass('active');
        $('.mobile-menu').css("display", "none");
    });

    $('.projects-link').on("click", function() {
        $('.contact-link, .home-link').removeClass('active');
        $(this).addClass('active');
        $('.mobile-menu').css("display", "none");
    });

    $('.contact-link').on("click", function() {
        $(".container:nth-child(1)").fadeOut(500, function() {
            $(".container:nth-child(2)").removeClass("d-none").fadeIn(500);
        });
        $('.home-link, .projects-link').removeClass('active');
        $(this).addClass('active');
        $('.mobile-menu').css("display", "none");
    });

    const isMobileMenuOpen = () => {
        return !clicks;
    };

    const openToggleBtn = () => {
        $hr1.css({
            "transform": "rotate(45deg)",
            "top": "25px",
        });

        $hr3.css({
            "transform": "rotate(-45deg)",
            "top": "25px",
        });

        $('.mobile-menu').css("display", "block");

        $hr2.fadeOut(200);


        console.log("opened");
    };

    const closeToggleBtn = () => {
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

        $('.mobile-menu').css("display", "none");
    };

    $togglerContainer.on('click', () => {
        if (!clicks) {
            openToggleBtn();
            console.log(clicks);

        } else {
            closeToggleBtn();
            console.log(clicks);
        }
        clicks = !clicks;
    });


});