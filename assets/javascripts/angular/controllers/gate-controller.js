angular.module('unfiltered')
    .controller('GateController',
        ['$location', '$rootScope',
        function ($location, $rootScope){

            $rootScope.oldEnough = false;

            this.months = [];
            this.days = [];
            this.years = [];
            this.birthday = {};
            this.legalDate = moment().subtract('years', 21);

            // Populate date arrays
            for (var i = 1; i <= 12; i += 1) {
                this.months.push(i);
            }
            for (var i = 1; i <= 31; i += 1) {
                this.days.push(i);
            }
            for (var i = moment().year(); i > moment().subtract('years', 120).year(); i -= 1) {
                this.years.push(i);
            }

            // create and check date is legal
            this.checkDate = function () {
                var date = moment();
                if (typeof this.birthday.year !== 'undefined' &&
                    typeof this.birthday.month !== 'undefined' &&
                    typeof this.birthday.day !== 'undefined') {
                    date = moment([parseInt(this.birthday.year), parseInt(this.birthday.month)-1, parseInt(this.birthday.day)]);
                }
                $rootScope.oldEnough = date.isValid() && date.isBefore(this.legalDate);
                return $rootScope.oldEnough
            }

            // // Check birthday is legal
            // this.checkDate = function () {
            //     if (typeof $scope.newEntry !== 'undefined') {
            //         date = moment($scope.newEntry.dob);
            //     }
            // }

            this.leaveAgeGate = function () {
                if (this.checkDate()) {
                    $location.path('/journey');
                }
            }
        }]);