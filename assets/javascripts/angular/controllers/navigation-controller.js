angular.module('unfiltered')
    .controller('NavigationController',
        ['$log', '$location', '$timeout', '$scope', '$rootScope', 'EntryService', 'progressService',
        function ($log, $location, $timeout, $scope, $rootScope, EntryService, progressService) {
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

            $scope.progress = 0;
            $rootScope.$on('progress-updated', function (event, progress) {
                $scope.progress = progress;
            });

            // Page navigation
            this.goToPath = function (newPath) {
                $location.path(newPath);
            };
        }]);
