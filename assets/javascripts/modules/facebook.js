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

            // Load the Facebook JavaScript SDK
            $.getScript('//connect.facebook.net/en_UK/all.js', function () {
                FB.init({
                    appId: facebookAppId,
                    version: 'v2.0'
                });

                FB.Canvas.setAutoGrow();

            });
        };


        var loginToFacebook = function () {

            var logged_in = false;
            var scopes = 'email, public_profile, user_birthday, user_location';
            // Check login status
            FB.getLoginStatus(function (response) {

                // If not logged in, call the login dialog with appropriate permissions
                if (response.status !== 'connected') {
                    if (response.status === 'not_authorized') {
                        FB.login(function (response) {
                            logged_in = response.status !== 'connected';
                        }, {scope: scopes, auth_type: 'rerequest'});
                    } else {
                        FB.login(function (response) {
                            logged_in = response.status !== 'connected';
                        }, {scope: scopes});
                    }
                } else {
                    logged_in = true;
                }
            });

            return logged_in;
        };

        return {
            init: init,
            loginToFacebook: loginToFacebook
        };
    }());
}());
