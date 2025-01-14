angular.module('unfiltered')
    .controller('NavigationController', [
        '$log', '$location', '$timeout', '$scope', '$rootScope', 'EntryService', '$upload', '$http', 'progressService', '$window',
        function ($log, $location, $timeout, $scope, $rootScope, EntryService, $upload, $http, $progressService, $window) {
            'use strict';

            $scope.$on('$viewContentLoaded', function (event) {
                $window.ga('send', 'pageview', { page: $location.path() });
            });

            // Init Facebook if necessary
            if (typeof FB === 'undefined') {
                DISCOVER_UNFILTERED.facebook.init();
            }

            $rootScope.location = $location;


            // After entry is saved, redirect
            $scope.$on('entrySaved', function () {

                var data = {};

                // If birthday doesn't exist, then what?
                data[$rootScope.userInfo.guid] = {
                    entrant: {
                        name:           $rootScope.userInfo.name,
                        phone:          $rootScope.userInfo.phone,
                        email:          $rootScope.userInfo.email,
                        birthdate:      $rootScope.userInfo.birthday,
                        street_address: $rootScope.userInfo.addr,
                        zipcode:        $rootScope.userInfo.zip
                    },
                    entry: {
                        s3_uri: $rootScope.userInfo.video,
                        date_created: $rootScope.userInfo.date_created,
                        location: 'Facebook'
                    }
                };

                var adminAppName = $('meta[name="admin_app_name"]').attr('content');

                // Actually submit the entry to the admin
                $http({
                    method: 'POST',
                    url: 'https://'+ adminAppName + '.herokuapp.com/api/warriordash',
                    data: data,
                    headers: {"Content-Type":"application/json"}
                }).success(function(data, status, headers, config) {
                    console.log('adminResponse',data);
                    // redirect to the entry page
                    $timeout(function () {
                        $location.path('/thanks');
                    }, (1*1000)); // timeout delay is ms
                }).error(function (data, status, headers, config){
                    console.error('Save failed :-(');
                });

            });

            // Page navigation
            this.goToPath = function (newPath) {
                $location.path(newPath);
            };

            $rootScope.imageUploads = [];
            $rootScope.progress = 0;

            $rootScope.onFileSelect = function ($files) {

                $location.path('/fb-authorize');

                $rootScope.files = $files;
                $rootScope.upload = [];
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    file.progress = parseInt(0);
                    (function (file, i) {
                        $http.get('/aws.json').success(function(response) {
                            var s3Params = response;
                            console.log(s3Params);
                            $rootScope.upload[i] = $upload.upload({
                                url: 'https://' + s3Params.bucket + '.s3.amazonaws.com/',
                                method: 'POST',
                                data: {
                                    'key' : 'temp/'+ Math.round(Math.random()*10000) + '$$' + file.name,
                                    'acl' : 'public-read',
                                    'Content-Type' : file.type,
                                    'AWSAccessKeyId': s3Params.accessKeyId,
                                    'success_action_status' : '201',
                                    'Policy' : s3Params.policy,
                                    'Signature' : s3Params.signature
                                },
                                file: file,
                            }).then(function(response) {
                                file.progress = parseInt(100);
                                $rootScope.progress = file.progress;
                                if (response.status === 201) {
                                    var data = xml2json.parser(response.data),
                                    parsedData;
                                    parsedData = {
                                        location: data.postresponse.location,
                                        bucket: data.postresponse.bucket,
                                        key: data.postresponse.key,
                                        etag: data.postresponse.etag
                                    };
                                    $rootScope.imageUploads.push(parsedData);

                                    // console.log('done uploading');

                                } else {
                                    alert('Upload Failed');
                                }
                            }, null, function(event) {
                                file.progress =  parseInt(100.0 * event.loaded / event.total);

                                // Broadcast progress update
                                $rootScope.$broadcast('progress-updated',event, file.progress);
                            });
                        });
                    }(file, i));
                }

            };

            $rootScope.$on('progress-updated', function (event, progress) {
                $rootScope.progress = progress;
            });

            this.createEntry = function () {
                if (typeof $rootScope.userInfo.birthday.month !== 'undefined'
                    && typeof $rootScope.userInfo.birthday.day !== 'undefined'
                    && typeof $rootScope.userInfo.birthday.year !== 'undefined') {
                    $rootScope.userInfo.birthday = moment([parseInt($rootScope.userInfo.birthday.year),
                                                            parseInt($rootScope.userInfo.birthday.month)-1,
                                                            parseInt($rootScope.userInfo.birthday.day)]);
                }
                EntryService.create($rootScope.userInfo);
                EntryService.save($rootScope.imageUploads[0].location, moment().format('L'));

            }

            $scope.shareOnFacebook = function () {
                console.log('attempting to share on facebook');
                FB.ui({
                    method: 'share',
                    href: 'https://apps.facebook.com/discover-unfiltered'
                }, function(response){});
                // navCtrl.goToPath('/');
            };
        }]);
