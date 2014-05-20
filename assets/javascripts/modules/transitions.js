(function () {
    'use strict';

    DISCOVER_UNFILTERED.transitions = (function () {
        var init = function () {
            $('#submit-btn').on('click', function(){
                event.preventDefault();
                $('.landing').fadeOut('slow');
                $('.start').delay( 800 ).fadeIn( 'slow' );
            });
        };

        return {
            init: init
        };
    }());
}());
