angular.module('unfiltered')
    .controller('GateController',
        ['$location', '$scope', '$rootScope',
        function ($location, $scope, $rootScope) {

            $rootScope.oldEnough = false;

            this.selectDate = moment();
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
                if (typeof $scope.newEntry.birthday.year === 'undefined' ||
                    typeof $scope.newEntry.birthday.month === 'undefined' ||
                    typeof $scope.newEntry.birthday.day === 'undefined') {
                    return false;
                } else {
                    this.selectDate = moment([parseInt($scope.newEntry.birthday.year),
                                    parseInt($scope.newEntry.birthday.month)-1,
                                    parseInt($scope.newEntry.birthday.day)]);
                    return this.selectDate.isValid();
                }
            }

            // create and check date is legal
            this.checkSelectDate = function () {
                if (this.validDate()) {
                    $rootScope.oldEnough = this.selectDate.isBefore(this.legalDate);
                }
                return $rootScope.oldEnough;
            }

            // Check birthday is legal
            this.checkDate = function () {
                if (typeof $scope.newEntry.dateOfBirth !== 'undefined') {
                    this.date = moment($scope.newEntry.birthday.dateOfBirth);
                }
                return this.date; //.isBefore(this.legalDate);
            }

            this.leaveAgeGate = function () {
                if (this.checkDate()) {
                    $location.path('/journey');
                }
            }
        }]);