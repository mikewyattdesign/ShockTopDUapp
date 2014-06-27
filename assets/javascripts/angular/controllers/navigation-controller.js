angular.module('unfiltered')
    .controller('NavigationController', ['$location', '$rootScope', function ($location, $rootScope) {
        'use strict';

        $rootScope.location = $location;

        // Page navigation
        this.goToPath = function (newPath) {
            $location.path(newPath);
        };
    }]);
