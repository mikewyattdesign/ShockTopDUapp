angular.module('unfiltered', [
    'ngResource',
    'ngRoute',
    'ngAnimate'
])
    .config(['$routeProvider', function($routeProvider) {
        'user strict';

        $routeProvider
            .when('/', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: '/views/age_gate.erb'
            })
            // .when('/', {
            //     controller: 'NavigationController',
            //     controllerAs: 'navCtrl',
            //     templateUrl: '/public/views/landing.html'
            // })
            // .when('/social', {
            //     controller: 'NavigationController',
            //     controllerAs: 'navCtrl',
            //     templateUrl: '/views/social.erb'
            // })
            .otherwise({
                redirectTo: '/'
            });
    }]);