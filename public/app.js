'use strict';

angular.module('portal-app', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            //$locationProvider.hashPrefix('!');

            $routeProvider
                /*.when('/', {
                    controller: 'dashboardController',
                    controllerAs: 'dashboardCtrl',
                    templateUrl: 'views/dashboard/template.html'
                })*/
                .when('/timetable', {
                    controller: 'timetableController',
                    controllerAs: 'timetableCtrl',
                    templateUrl: 'views/timetable/template.html'
                });
        }
    ]);