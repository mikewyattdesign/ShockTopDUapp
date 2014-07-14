angular.module('unfiltered')
    .controller('NavigationController',
        ['$log', '$location', '$rootScope',
        function ($log, $location, $rootScope) {
            'use strict';

            if (!($rootScope.oldEnough)) {
                $log.info('not old enough');
                $location.path('/');
            }

            $rootScope.location = $location;

            // Page navigation
            this.goToPath = function (newPath) {
                $location.path(newPath);
            };
        }]);
