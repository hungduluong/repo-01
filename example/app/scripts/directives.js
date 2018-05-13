'use strict';
angular.module('weyoApp')
.directive('navbar', function() {
  return {
    templateUrl: 'views/controls/navbar.html',
    controller: ['$scope', '$cookies', function($scope, $cookies) {
      var auth = $cookies.getObject("auth");
      $scope.loggedIn = auth !== null;


    }],
    controllerAs: 'nav'
  };
});
