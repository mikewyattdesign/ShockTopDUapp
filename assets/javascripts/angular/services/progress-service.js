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
                if (progress === 100) {
                    $rootScope.$broadcast('progress-complete');
                }
            };

            // Set the current progress value.  Value must be between
            // 0 and 100;
            this.set = function (value) {
                progress = value;
                progressUpdated();
            };

            this.advance = function () {
                if (progress === 100) {
                    return false;
                }
                progress = progress + ((max - progress) * 0.1);
                progressUpdated();
            };

            this.complete = function () {
                progress = 100;
                progressUpdated();
            };
        }]);
