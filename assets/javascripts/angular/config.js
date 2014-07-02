angular.module('unfiltered')
    .config(['$routeProvider', function($routeProvider) {
        'user strict';

        $routeProvider
            .when('/', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/age-gate.html'
            })
            .when('/landing', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/landing.html'
            })
            .when('/start', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: '/views/start.html'
            })
            .when('/video', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: '/views/video.html'
            })
            .when('/social', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: '/views/social.html'
            })
            .otherwise({
                redirectTo: '/'
            });
        }]);