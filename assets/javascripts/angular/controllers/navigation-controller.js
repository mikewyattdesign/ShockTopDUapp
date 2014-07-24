angular.module('unfiltered')
    .controller('NavigationController',
        ['$log', '$location', '$timeout', '$scope', '$rootScope', 'EntryService',
        function ($log, $location, $timeout, $scope, $rootScope, EntryService) {
            'use strict';

            // if (!($rootScope.oldEnough)) {
            //     $log.info('not old enough');
            //     $location.path('/');
            // }

            $rootScope.location = $location;


            // After entry is saved, redirect
            $scope.$on('entrySaved', function () {
                // redirect to the entry page
                $timeout(function () {
                    $location.path('/entry');
                }, (5*1000)); // timeout delay is ms
            });

            // Page navigation
            this.goToPath = function (newPath) {
                $location.path(newPath);
            };
        }]);
