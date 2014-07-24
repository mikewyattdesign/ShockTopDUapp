angular.module('unfiltered')
    .controller('NavigationController',
        ['$log', '$location', '$timeout', '$scope', '$rootScope', 'EntryService','$upload',
        function ($log, $location, $timeout, $scope, $rootScope, EntryService, $upload ) {
            'use strict';

            // if (!($rootScope.oldEnough)) {
            //     $log.info('not old enough');
            //     $location.path('/');
            // }

            $rootScope.location = $location;

            $scope.oldEnough = $("meta[name='old_enough']").attr('content') === "true";

            // Set new entry dateOfBirth if old enough
            if ($scope.oldEnough) {
                    $scope.newEntry = {};
                    $scope.newEntry.dateOfBirth = '07/28/1986';
            }


            // After entry is saved, redirect
            $scope.$on('entrySaved', function () {
                // redirect to the entry page
                $timeout(function () {
                    $location.path('/entry');
                }, (5*1000)); // timeout delay is ms
            });

            $scope.onFileSelect = function($files) {
               //$files: an array of files selected, each file has name, size, and type.
               for (var i = 0; i < $files.length; i++) {
                 var file = $files[i];
                 $scope.upload = $upload.upload({
                   url: 'server/upload/url', //upload.php script, node.js route, or servlet url
                   //method: 'POST' or 'PUT',
                   //headers: {'header-key': 'header-value'},
                   //withCredentials: true,
                   data: {myObj: $scope.myModelObj},
                   file: file, // or list of files ($files) for html5 only
                   //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                   // customize file formData name ('Content-Desposition'), server side file variable name. 
                   //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
                   // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                   //formDataAppender: function(formData, key, val){}
                 }).progress(function(evt) {
                   console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                 }).success(function(data, status, headers, config) {
                   // file is uploaded successfully
                   console.log(data);
                 });
                 //.error(...)
                 //.then(success, error, progress); 
                 // access or attach event listeners to the underlying XMLHttpRequest.
                 //.xhr(function(xhr){xhr.upload.addEventListener(...)})
               }
           }

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
