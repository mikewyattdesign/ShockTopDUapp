(function () {
    'use strict';

    DISCOVER_UNFILTERED.init = function () {
        // DISCOVER_UNFILTERED.transitions.init();

        console.log("init.js init");
        DISCOVER_UNFILTERED.ageGate.init();
        console.log("init.js ended");
    };

    // Start the application once the DOM has loaded.
    $(document).on('ready', DISCOVER_UNFILTERED.init());
}());
