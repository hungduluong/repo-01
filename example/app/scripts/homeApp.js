'use strict';
(function() {
var apiUrl = "https://weyo-143201.appspot.com/api";
//var apiUrl = 'http://localhost:3000/api';
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
    'ngCookies',
    'ngHello'
  ])
  .config(function (helloProvider) {
      helloProvider.init({
        google: "556856449785-17asjevai5frpnvqctijoog53vevl1pu.apps.googleusercontent.com",
        facebook: ''
      });
  })
  .controller("LoginCtrl", ['$scope', '$http', '$cookies', 'hello', function($scope, $http, $cookies, hello) {
    $scope.login = function (network) {
      // verify this user has registered
      hello(network).login().then(function(u) {
        hello(u.network).api('me').then(function(me) {
          $http.get(apiUrl + '/login?accessToken='+u.authResponse.access_token+'&network='+network+'&id='+me.id)
          .then(function(valid) {
            if(valid.data) {
              $cookies.put('userId', valid.data.userId);
              window.location.href = valid.data.link;
            }
          });
        });
      });
    };
  }])
  .controller("RegistrationCtrl", ['$scope', '$http', 'hello', function($scope, $http, hello) {
    $scope.workflowStep = null;
    $scope.workflowNext = function(stepName) {
      $scope.workflowStep = stepName;

      if(stepName === "step2") {
        // submit the user into and register
        // todo: secure this endpoint
        $http.post(apiUrl + '/registeruser', {data: $scope.reg}).then(function() {
          $scope.workflowStep = 'stepDone';
        }, function(err) {
          console.log(err);
          $scope.workflowStep = 'stepDone';
        });

        setTimeout(function() {
          //window.location.href = "/userhome"
        }, 2000);
      }
    };

    $scope.getDetails = function(network) {
      console.log('getDetails');
      // hello.on("auth.login", function(res) {
      // });
        hello(network).login({scope: 'email'}).then(function(result) {
            console.log(result);
            hello(result.network).api('me').then(function(me) {
              $scope.$apply(function() {
                // attempt to prefill some of the information
                console.log(me);
                $scope.reg = {
                  firstName : me.first_name,
                  lastName :me.last_name,
                  email:  me.email,
                  auth_id: me.id,
                  auth_network: result.network
                };
                $scope.workflowNext('step1');
              });
            });
      });
    };

  }]);
})();
