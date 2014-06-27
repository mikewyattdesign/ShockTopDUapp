(function () {
    'use strict';

    DISCOVER_UNFILTERED.ageGate = (function () {
        var init = function () {
            var $month = $("#month");
            $month.append("Hello");
            console.log($month);
            // var options = ["1", "2", "3", "4", "5"];
            // for (var i = 0; i < options.length; i++) {
            //     var opt = options[i];
            //     var el = document.createElement("option");
            //     el.textContent = opt;
            //     el.value = opt;
            //     month.append(el);
            //     console.log('appended');
            // }
        };

        return {
            init: init
        };
    }());
}());
