angular.module('unfiltered')
    .controller('GateController', [function() {
        this.months = [];
        this.days = [];
        this.years = [];
        this.birthday = {};
        this.legalDate = moment().subtract('years', 21);

        // Populate day arrays
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
            if (this.birthday.year !== undefined && this.birthday.month !== undefined && this.birthday.day !== undefined) {
                var date = moment([parseInt(this.birthday.year), parseInt(this.birthday.month)-1, parseInt(this.birthday.day)]);
                return date.isBefore(this.legalDate);
            } else {
                return false;
            }
        }
    }]);