'use strict';

/**
 * @ngdoc overview
 * @name weyoApp
 * @description
 * # weyoApp
 *
 * Main module of the application.
 */
angular
  .module('weyoApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/driverRegistration', {
        templateUrl: 'views/driverRegistration.html',
        controller: 'DriverRegistrationCtrl',
        controllerAs: 'driver'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
