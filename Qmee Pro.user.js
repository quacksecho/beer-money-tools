// ==UserScript==
// @name         Qmee Pro
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Be notified about Qmee surveys you feel are worth your time
// @author       quacksecho
// @match        https://www.qmee.com/users
// @match        https://www.qmee.com/users/surveys
// @grant        GM.notification
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // USER CONTROLS HERE
    var THRESHOLD = 3; // Pence per minute - How much is your time worth to you, at minimum?
    var WAIT = 4; // How long to wait (in seconds) before first run - might need to change if you have a slow connection
    var INTERVAL = 10; // How long (in seconds) between running each check (Qmee are changing their page structure to auto-reload so you might need to change this
    var RELOAD = 120; // How long (in seconds) to wait before reloading whole page - how worried are you about missing a new survey?
    // END OF USER CONTROLS

    var $ = window.jQuery;
    var PRO_TAG = "pro-tagged";

    function check_and_tag() {

        var selector = "a.survey:not(.locked)";

        $(selector).each(function() {
            var href = this.href;
            var value_text = $(this).find(".reward")[0].innerText.replace(/^.*\n/,"");
            var pence = value_text.replace(/[£p\.]/g, "");

            var duration = $(this).find(".duration").children().first();

            var minutes = duration.text().replace(/\smin[s.]/, "");

            var pm = pence / minutes;
            var ph = pm * 60 / 100;


            // If the pence per minute is above our chosen threshold value
            if (pm > THRESHOLD) {
                // Fire alert, displayed for one minute, alert starts survey if clicked
                GM.notification({
                    title: 'Qmee',
                    text: "Survey: " + value_text + " for " + minutes + " minutes, " + pm.toFixed(2) + "p / min (£" + ph.toFixed(2) + " / hour)",
                    image: 'https://www.qmee.com/favicon.ico',
                    timeout: INTERVAL * 1000,
                    onclick: function() { focus(); window.location.href = href; }
                });
                if (!$(this).hasClass(PRO_TAG)) {
                    // Display the pence per minute on the survey tile, in bold
                    $(this).append("<div style=\"padding-left: 0.5rem\"><span style=\"font-weight: bold; color: #000000;\">(" + pm.toFixed(2) + "p / min)</span></div>");
                    $(this).addClass(PRO_TAG);
                }

            } else {
                if (!$(this).hasClass(PRO_TAG)) {
                    // Display the pence per minute on the survey tile, but less strong
                    $(this).append("<div style=\"padding-left: 0.5rem\"><span style=\"font-weight: normal; color: #808080;\">(" + pm.toFixed(2) + "p / min)</span></div>");
                    $(this).addClass(PRO_TAG);
                }
            }

        });

        // Set time interval for next check
        window.setTimeout(check_and_tag, INTERVAL * 1000);
    }

    // Set time for initial run
    window.setTimeout(check_and_tag, WAIT * 1000);

    // Reload page after 60 seconds to get new surveys
    window.setTimeout(function() {
        location.reload();
    }, RELOAD * 1000);

})();