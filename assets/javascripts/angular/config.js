angular.module('unfiltered')
    .config(['$routeProvider', function($routeProvider) {
        'user strict';

        $routeProvider
            .when('/', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/age-gate.html'
            })
            .when('/entry', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/entry.html'
            })
            .when('/terms', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/terms.html'
            })
            .when('/fb-authorize', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/fb-authorize.html'
            })
            .when('/upload', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: 'views/upload.html'
            })
            .when('/journey', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: '/views/journey.html'
            })
            .when('/thanks', {
                controller: 'NavigationController',
                controllerAs: 'navCtrl',
                templateUrl: '/views/thanks.html'
            })
            .otherwise({
                redirectTo: '/'
            });
        }]);