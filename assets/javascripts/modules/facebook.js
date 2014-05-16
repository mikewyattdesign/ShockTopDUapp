(function () {
    'use strict';
    DISCOVER_UNFILTERED.facebook = (function () {
        var facebookAppId;
        var init = function () {
            if (document.getElementById('facebook-app-id')) {
                facebookAppId = document.getElementById('facebook-app-id').innerHTML;
                connectToFacebook();
            }
        };

        var connectToFacebook = function () {
            $.ajaxSetup({ cache: true });
            $.getScript('//connect.facebook.net/en_UK/all.js', function () {
                FB.init({
                    appId: facebookAppId
                });

                FB.Canvas.setAutoGrow();
            });
        };

        return {
            init: init
        };
    }());
}());
