'use strict';

$(function () {
    let currentProgress = 0,
        currentTeam = 0;
    let teamsInfo = [
        {
            "name": "Web development",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi nostrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odio numquam perspiciatis, nemo, quasi vel quidem, sit beatae molestias laborum neque distinctio nihil. Culpa reiciendis commodi nostrum et cupiditate in. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste nostrum omnis voluptates odit iure natus sint! Debitis blanditiis adipisci excepturi animi totam sint esse cumque.",
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
            "description": "voluptates odit iure natus sint! Imque exercitationem dignissimos, quibusdam ipsa nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod praesentium reiciendis tempore numquam accusamus aliquid, quasi quisquam voluptate sequi nostrum quas dignissimos voluptas excepturi beatae enim mollitia animi facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odio numquam perspiciatis, nemo, quasi vel quidem, cupiditate in. Por lome toe. Iste nostrum omnis.",
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

    const $teamName = $('.team-name'),
        $teamMotto = $('.team-motto'),
        $teamDescription = $('.team-description'),
        $progressBar = $('.progress-bar');

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

        $teamName.text(team["name"]);
        $teamMotto.text(team["motto"]);
        $teamDescription.text(team["description"]);

        $('object').attr("data",team["icon"]);
        $("#dynamic").css("width", `${0}%`);

        if (currentTeam === 0) {
            console.log("web");
            $("h1").removeClass("text-server").addClass("text-web");
            $teamName.removeClass("text-server").addClass("text-web");
            $teamMotto.removeClass("text-server").addClass("text-web");
            $progressBar.removeClass("bg-server").addClass("bg-web");
        } else if (currentTeam === 1) {
            console.log("app");
            $("h1").removeClass("text-web").addClass("text-app");
            $teamName.removeClass("text-web").addClass("text-app");
            $teamMotto.removeClass("text-web").addClass("text-app");
            $progressBar.removeClass("bg-web").addClass("bg-app");
        } else if (currentTeam === 2) {
            console.log("game");
            $("h1").removeClass("text-app").addClass("text-game");
            $teamName.removeClass("text-app").addClass("text-game");
            $teamMotto.removeClass("text-app").addClass("text-game");
            $progressBar.removeClass("bg-app").addClass("bg-game");
        } else if (currentTeam === 3) {
            console.log("server");
            $("h1").removeClass("text-game").addClass("text-server");
            $teamName.removeClass("text-game").addClass("text-server");
            $teamMotto.removeClass("text-game").addClass("text-server");
            $progressBar.removeClass("bg-game").addClass("bg-server");
        }
    };

    /*const pause = milliseconds => {
        let dt = new Date();
        while ((new Date()) - dt <= milliseconds) { /!* Do nothing *!/ }
    }*/

});

