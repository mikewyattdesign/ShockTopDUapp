angular.module('unfiltered')
    .controller('GateController',
        ['$location', '$scope', '$rootScope',
        function ($location, $scope, $rootScope){

            $rootScope.oldEnough = false;

            this.date = moment();
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

            // create and check if it is valid date
            this.validDate = function () {
                console.log($scope.newEntry.birthday.year);
                console.log($scope.newEntry.birthday.month);
                console.log($scope.newEntry.birthday.day);
                if (typeof $scope.newEntry.birthday.year === 'undefined' ||
                    typeof $scope.newEntry.birthday.month === 'undefined' ||
                    typeof $scope.newEntry.birthday.day === 'undefined') {
                    return false;
                } else {
                    this.date = moment([parseInt($scope.newEntry.birthday.year),
                                    parseInt($scope.newEntry.birthday.month)-1,
                                    parseInt($scope.newEntry.birthday.day)]);
                    return this.date.isValid();
                }
            }

            // create and check date is legal
            this.checkSelectDate = function () {
                if (this.validDate()) {
                    $rootScope.oldEnough = this.date.isBefore(this.legalDate);
                }
                return $rootScope.oldEnough;
            }

            // Check birthday is legal
            this.checkDate = function () {
                var date = moment();
                // var legalDate = moment().subtract('years', 21);
                if (typeof $scope.newEntry !== 'undefined') {
                    date = moment($scope.newEntry.dob);
                }
                return date.isBefore(this.legalDate);
            }

            this.leaveAgeGate = function () {
                if (this.checkDate()) {
                    $location.path('/journey');
                }
            }
        }]);