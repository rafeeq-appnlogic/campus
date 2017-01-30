'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','$localStorage','$timeout', function($scope, $http, $state,$localStorage,$timeout) {
    $scope.checkLogin=function(){
      $scope.authError = null;
      $http({
        method : "GET",
        url : "http://192.168.1.136/smartedu/api/GeneralAPI/login",
        params : {"USER_EMAIL": $scope.userid, "USER_PASSWORD": $scope.password},
      }).then(function(response){
        $localStorage.user_id=response.data.message[0].USER_FIRST_NAME;
        $state.go('app.dashboard-v1');
      }, function myError(response) {
        $scope.authError = 'Please Enter Valid Email';
      });
    };
    $scope.hideMsg=function(){
      $scope.authError=null;
    }
  }])
;
