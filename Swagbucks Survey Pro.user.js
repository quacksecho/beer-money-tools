// ==UserScript==
// @name         Swagbucks Survey Pro
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Notify you when Swagbucks actually has a decent survey instead of crappy pennies for 25 minutes
// @author       quacksecho
// @match        https://www.swagbucks.com/surveys
// @grant        GM.notification
// ==/UserScript==

(function() {
    'use strict';

    function playAlertSound(amount,survey_length,coin_minute,onclick) {
        var hourly = parseFloat(coin_minute*60);
        var hourly_txt = "";
        if (hourly >= 100)
        {
            hourly_txt = ((hourly/100).toFixed(2)).toString() + " SB";
        }
        else
        {
            hourly_txt = hourly.toString() + "p";
        }
        GM.notification({text: amount + " SB for " + survey_length + " minutes (" + coin_minute.toString()+" SB/min, "+hourly_txt+"/h)", title: 'Swagbucks Survey', image: 'https://www.swagbucks.com/favicon.ico', timeout: 120000, onclick: function() { focus() } });
    }

    var FREQUENCY = 60000; // 1 minute (60 seconds) between refreshes
    var minimum_coin= 7.00; // Minimum amount of cents per minute. adjust to your liking

    setTimeout(function () {
        var to_sort = [];

        var div = document.querySelectorAll("#surveyList tbody tr");
        for(var i=0;i<div.length;i++) {
            var survey_nodes = div[i].children;
            var reward_txt = survey_nodes[1].childNodes[0].innerText.split(" ")[0];
            var survey_length = survey_nodes[0].innerText.split(" ")[0];
            var coin_minute = (parseFloat(reward_txt) / parseInt(survey_length)).toFixed(2);
            var s_link = survey_nodes[3].childNodes[0].onclick;
            //alert("case type: "+case_type+" amount: "+reward_txt+" length: "+survey_length+" coin/minute: "+coin_minute.toString());
            if(coin_minute>=minimum_coin){
//                playAlertSound(reward_txt,survey_length, coin_minute, s_link);
                survey_nodes[2].innerHTML = survey_nodes[2].innerHTML + " <strong>(" + coin_minute + " SB/min)</strong>";
            } else {
                survey_nodes[2].innerHTML = survey_nodes[2].innerHTML + " (" + coin_minute + " SB/min)";
            }
            if (reward_txt == "100" && survey_length == "20") {
                playAlertSound(reward_txt,survey_length, coin_minute, s_link);
            }
            to_sort.push([coin_minute, div[i]]);
        }
        to_sort.sort((a, b) => b[0] - a[0]);
        var tbodies = document.querySelectorAll("#surveyList tbody");
        var tbod = tbodies[tbodies.length - 1];
        to_sort.forEach((row) => tbod.append(row[1]));
    }, 6000); // Wait 3 seconds to make sure the page is loaded
    setTimeout(function(){ location.reload(); }, FREQUENCY);
})();