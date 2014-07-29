angular.module('unfiltered')
    .controller('NavigationController',
        ['$log', '$location', '$timeout', '$scope', '$rootScope', 'EntryService','$upload', '$http', 'progressService',
        function ($log, $location, $timeout, $scope, $rootScope, EntryService, $upload, $http, $progressService ) {
            'use strict';

            // Init Facebook if necessary
            if (typeof FB === 'undefined'){
                DISCOVER_UNFILTERED.facebook.init()
            }

            $rootScope.location = $location;
            $scope.facebookConnected = false;


            // After entry is saved, redirect
            $scope.$on('entrySaved', function () {

                    var data = {};

                    // If birthday doesn't exist, then what?
                    data[$rootScope.userInfo.guid] = {
                        entrant: {
                            name:           $rootScope.userInfo.name,
                            email:          $rootScope.userInfo.email,
                            birthdate:      $rootScope.userInfo.birthday
                        },
                        entry: {
                            s3_uri: $rootScope.userInfo.video,
                            date_created: $rootScope.userInfo.date_created,
                            location: 'Facebook'
                        }
                    };

                    // Actually submit the entry to the admin
                    $http({
                        method: 'POST',
                        url: 'http://du-admin.herokuapp.com/api/warriordash',
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
                $scope.facebookConnected = DISCOVER_UNFILTERED.facebook.facebookConnected();

                console.log($scope.facebookConnected);
                // If connected to facebook, grab the user's info and save the entry
                if ($scope.facebookConnected === true) {
                    console.log('already connected');
                    FB.api('/me', function (response) {
                        $rootScope.userInfo = response;
                        EntryService.create($rootScope.userInfo);
                        console.log('saved entry');
                    });
                    $location.path('/upload');
                } else {
                    $location.path('/fb-authorize');
                }

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

                                    console.log('done uploading');
                                    // Save the entry if the user has already logged into Facebook and connected
                                    if (typeof $rootScope.userInfo !== 'undefined' && $rootScope.userInfo.hasOwnProperty('name') && $rootScope.userInfo.hasOwnProperty('email')){
                                        console.log('saving upload info');
                                        EntryService.save($rootScope.imageUploads[0].location, Date.now());
                                    } else {
                                        console.log('waiting for Facebook info');
                                    }

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

            // Facebook Authorization
            $scope.getFacebookInfo = function () {
                DISCOVER_UNFILTERED.facebook.loginToFacebook(function(){
                    FB.api('/me', function (response) {
                        $rootScope.userInfo = response;
                        EntryService.create($rootScope.userInfo);

                        // Save the entry if the video has already been uploaded
                        if (typeof $rootScope.imageUploads !== 'undefined' && $rootScope.imageUploads[0].hasOwnProperty('location')){
                            EntryService.save($rootScope.imageUploads[0].location, Date.now());
                        }
                    });
                });
            };
        }]);
