// ==UserScript==
// @name         Scheduler times
// @namespace    https://github.com/kristarella/Schedule-Planner-Local-Times
// @version      1.1
// @description  add local times to Planner page of Scheduler
// @author       kristarella
// @require      http://code.jquery.com/jquery-latest.js
// @match        https://schedule.happy.tools/planner
// @updateURL    https://github.com/kristarella/Schedule-Planner-Local-Times/master/local-times.user.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;
var runTimer = setInterval(addLocalTime, 3000);


function addLocalTime() {
    $(".block-graph__header-col").each(function( index ) {
        var timeData = parseInt($(this).data('e2e-value'))*1000;
        var time = new Date(timeData);
        var options = { hour12: false, hour: '2-digit', minute: '2-digit', second: undefined };
        var localTime = time.toLocaleTimeString('en-US', options);
        $(".block-graph__header-time-text", this).append(' <span class="local-time">'+ localTime +'</span>');
        $("span.local-time").css({"background-color":"var(--color-accent-dark)", "color":"var(--color-white)", "border-radius": "2px", "padding": "2px"});

         if (1 == index) {
            var offset = new Date().getTimezoneOffset();
            var timezone = offset/60;
            $(".selected-timezone").append(' <span class="local-time" title="Local time">UTC'+ timezone +'</span>')
        }

        if ( $(".block-graph__header-col:last-of-type .block-graph__header-time-text span").hasClass('local-time') ) {
            clearInterval(runTimer);
            return false;
        }

        index++;

    });
}
