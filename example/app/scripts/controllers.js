'use strict';

/**
 * @ngdoc function
 * @name weyoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weyoApp
 */
angular.module('weyoApp')
  .controller('MainCtrl', ['$scope','$http','$cookies', function ($scope,$http,$cookies) {
    var id = $cookies.get("userId");
    $http.get('https://weyo-143201.appspot.com/api/driver/' + id).then(function(result) {
      if(result.data === null) {
        // show registration link
        $scope.showDriverRegistration = true;
      } else {
        $scope.showDriverRegistration = false;
        $scope.campaignNumber = 0;
        $scope.today = new Date();
        $scope.startTime=result.startTime;
        $scope.endTime=result.endTime;
        $scope.distance=result.distance;
        $scope.duration=0;
        $scope.totalPay=0;
        // show driver info
      }
    });
  }]);
