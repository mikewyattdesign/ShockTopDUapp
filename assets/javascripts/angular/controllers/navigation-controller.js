angular.module('unfiltered')
    .controller('NavigationController', function ($location, $rootScope) {
        'use strict';

        $rootScope.location = $location;

        // Page navigation
        this.goToEntry = function () {
            $location.path('/entry');
        };

        this.goToChoice = function () {
            $location.path('/choice');
        };

        this.goToVideo = function () {
            $location.path('/video');
        };

        this.goToWrite = function () {
            $location.path('/write');
        };

        this.goToThanks = function () {
            $location.path('/thanks');
        };



        this.goToTerms = function () {
            $location.path('/terms');
        };

    });
