angular.module('unfiltered', [
    'ngRoute',
    'ngAnimate'
])
    .config(['$routeProvider', function($routeProvider) {
        'user strict';

        $routeProvider
            .when('/ageGate', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/age_gate.erb'
            })
            .when('/entry', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/entry.erb'
            })
            .when('/social', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/social.erb'
            })
            .otherwise({
                redirectTo: '/ageGate'
            });
    }]);








;