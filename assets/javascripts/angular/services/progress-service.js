angular.module('unfiltered')
    .service('progressService', [
        '$rootScope', '$timeout',
        function ($rootScope, $timeout) {
            'use strict';

            var min = 0;
            var max = 100;

            var progress = 0;

            // From Mike:
            // looks like we can use a $scope.file.progress value
            var advanceProgress = function () {
                progress = progress + Math.random() * (max - progress);
                progressUpdated();
            };

            var progressUpdated = function () {
                $rootScope.$broadcast('progress-updated', progress);
            };

            advanceProgress();

            $timeout(advanceProgress, 500);
            $timeout(advanceProgress, 1700);
            $timeout(advanceProgress, 2500);
            $timeout(advanceProgress, 3800);
        }]);
