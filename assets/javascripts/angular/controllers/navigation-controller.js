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

            $scope.oldEnough = $("meta[name='old_enough']").attr('content') === "true";

            // Set new entry dob if old enough
            if ($scope.oldEnough) {
                    $scope.newEntry = {};
                    $scope.newEntry.dob = '07/28/1986';
            }


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

            // Entry Creation
            this.createEntry = function () {
                if (EntryService.create($scope.newEntry)) {
                    $location.path('/journey');
                } else {
                    $location.path('/');
                }
            }
        }]);
