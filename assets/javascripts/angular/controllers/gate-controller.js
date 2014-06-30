angular.module('unfiltered')
    .controller('GateController', ['$scope', function($scope) {
        this.months = [];
        this.days = [];
        this.years = [];

        for (var i = 1; i <= 12; i += 1) {
            this.months.push(i);
        }
        for (var i = 1; i <= 31; i += 1) {
            this.days.push(i);
        }
        for (var i = 1900; i <= Date.today.year; i += 1) {
            this.years.push(i);
        }
    }]);