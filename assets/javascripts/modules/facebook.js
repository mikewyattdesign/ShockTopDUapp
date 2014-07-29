(function () {
    'use strict';
    DISCOVER_UNFILTERED.facebook = (function () {
        var facebookAppId;
        var init = function () {
            if ($('meta[name="facebook_app_id"]').length > 0) {
                facebookAppId = $('meta[name="facebook_app_id"]').attr('content');
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

        var facebookConnected = function() {
            var connected = false;
            FB.getLoginStatus(function (response) {
                connected = response.status === 'connected';
            });
            return connected;
        }

        var loginToFacebook = function (callback) {

            var logged_in = false;
            var scopes = 'email, public_profile, user_birthday, user_location';
            var guardedCallback = function() {
                if (typeof callback === "function"){
                    console.log()
                    callback();
                }
            };
            // Check login status
            FB.getLoginStatus(function (response) {

                // If not logged in, call the login dialog with appropriate permissions
                if (response.status !== 'connected') {
                    if (response.status === 'not_authorized') {
                        FB.login(function (response) {
                            logged_in = response.status === 'connected';
                            if (logged_in) {
                                guardedCallback();
                            }
                        }, {scope: scopes, auth_type: 'rerequest'});
                    } else {
                        FB.login(function (response) {
                            logged_in = response.status === 'connected';
                            if (logged_in) {
                                guardedCallback();
                            }
                        }, {scope: scopes});
                    }
                } else {
                    logged_in = true;
                    guardedCallback();
                }
            });

            return logged_in;
        };

        return {
            init: init,
            loginToFacebook: loginToFacebook,
            facebookConnected: facebookConnected
        };
    }());
}());
