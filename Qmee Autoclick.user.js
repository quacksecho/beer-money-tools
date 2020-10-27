// ==UserScript==
// @name         Qmee Autoclick
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Automatically click the highest paying survey (per minute) above threshold
// @author       quacksecho
// @match        https://www.qmee.com/users
// @match        https://www.qmee.com/users/surveys
// @grant        GM.notification
// @grant        window.focus
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // USER CONTROLS HERE
    var THRESHOLD = 3; // Pence per minute - How much is your time worth to you, at minimum?
    var WAIT = 2; // How long to wait (in seconds) before first run - might need to change if you have a slow connection
    var INTERVAL = 5; // How long (in seconds) between running each check (Qmee are changing their page structure to auto-reload so you might need to change this
    var RELOAD = 120; // How long (in seconds) to wait before reloading whole page - how worried are you about missing a new survey?
    // END OF USER CONTROLS

    var $ = window.jQuery;
    var PRO_TAG = "pro-tagged";

    function check_and_go() {

        var selector = "a.survey:not(.locked)";
        var max_pm = 0;
        var max_minutes;
        var max_ph;
        var max_value_text;
        var link_to_click = null;

        var to_sort = [];

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
                if (pm > max_pm) {
                    max_pm = pm;
                    max_minutes = minutes;
                    max_ph = ph;
                    max_value_text = value_text;
                    link_to_click = href;
                }
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

            to_sort.push([pm, this]);

        });

        if (link_to_click != null) {
            GM.notification({
                title: 'Qmee',
                text: "Survey: " + max_value_text + " for " + max_minutes + " minutes, " + max_pm.toFixed(2) + "p / min (£" + max_ph.toFixed(2) + " / hour)",
                image: 'https://www.qmee.com/favicon.ico',
                onclick: function() { focus(); }
            });
            focus();
            window.location.href = link_to_click;
        } else {
            to_sort.sort((a, b) => b[0] - a[0]);
            var parent = to_sort[0][1].parentNode;
            to_sort.forEach((row) => parent.append(row[1]));

            // Set time interval for next check
            window.setTimeout(check_and_go, INTERVAL * 1000);
        }
    }

    // Set time for initial run
    window.setTimeout(check_and_go, WAIT * 1000);

    // Reload page after 60 seconds to get new surveys
    window.setTimeout(function() {
        location.reload();
    }, RELOAD * 1000);

})();