'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','$localStorage','$timeout', function($scope, $http, $state,$localStorage,$timeout) {
    $scope.checkLogin=function(){
      $localStorage.user_id='vijay';
      $scope.authError = null;
      // console.log($localStorage.user_id,'$localStorage.user_id');
      if ($localStorage.user_id==$scope.userid) {
        $state.go('app.dashboard-v1');
      }else{
        $scope.authError = 'Please Enter Valid UserId';  
      }
    };
    $scope.hideMsg=function(){
      $scope.authError=null;
    }
  }])
;
