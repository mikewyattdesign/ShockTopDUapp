angular.module('unfiltered')
    .controller('NavigationController',
        ['$log', '$location', '$timeout', '$scope', '$rootScope', 'EntryService','$upload', '$http', 'progressService',
        function ($log, $location, $timeout, $scope, $rootScope, EntryService, $upload, $http, $progressService ) {
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

            $scope.imageUploads = [];

            $scope.onFileSelect = function ($files) {
                $scope.files = $files;
                $scope.upload = [];
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    file.progress = parseInt(0);
                    (function (file, i) {
                        $http.get('/aws.json').success(function(response) {
                            var s3Params = response;
                            console.log(s3Params);
                            $scope.upload[i] = $upload.upload({
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
                                if (response.status === 201) {
                                    var data = xml2json.parser(response.data),
                                    parsedData;
                                    parsedData = {
                                        location: data.postresponse.location,
                                        bucket: data.postresponse.bucket,
                                        key: data.postresponse.key,
                                        etag: data.postresponse.etag
                                    };
                                    $scope.imageUploads.push(parsedData);

                                } else {
                                    alert('Upload Failed');
                                }
                            }, null, function(evt) {
                                file.progress =  parseInt(100.0 * evt.loaded / evt.total);
                            });
                        });
                    }(file, i));
                }
            };
            $scope.progress = 0;
            $rootScope.$on('progress-updated', function (event, progress) {
                $scope.progress = progress;
            });

            // Page navigation
            this.goToPath = function (newPath) {
                $location.path(newPath);
            };
        }]);
