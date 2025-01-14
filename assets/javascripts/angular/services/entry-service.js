angular.module('unfiltered')
    .service('EntryService', [
        '$log', '$location', '$rootScope', '$http',
        function ($log, $location, $rootScope, $http ) {
            'use strict';
            var uuid = 1;
            var entries = {};
            var tempEntry = {};

            // entry schema:
            // 'name'  : 'First Last',
            // 'phone' : '(635) 856-5309',
            // 'email' : 'name@email.com',
            // 'dob'   : 'yyyy-mm-dd',
            // 'addr'  : '1227 West Street Address',
            // 'zip'   : '63084',
            // 'terms' : 'true',
            // 'video' : 'null',
            // 'date_created' : '1234567890'

            this.create = function (entry) {
                if (typeof entry === 'undefined') {
                    // clear entry
                    tempEntry = {
                        guid: uuid + Date.now()
                    };
                    return false;
                } else {
                    tempEntry = entry;
                    if (!tempEntry.hasOwnProperty('guid')) {
                        tempEntry.guid= uuid + Date.now();
                    }
                    return true;
                }
            }

            this.save = function (videoLoc, createDate) {
                if (tempEntry === null) {
                    $log.info('tempEntry null');
                    $location.path('/');
                } else {
                    console.log(tempEntry);
                    tempEntry.video = videoLoc;
                    tempEntry.date_created = createDate;
                    console.log(tempEntry);
                    $rootScope.$broadcast('entrySaved');
                }
            }
        }]);
