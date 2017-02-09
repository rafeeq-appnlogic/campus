'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','$localStorage','$timeout','$rootScope', function($scope, $http, $state,$localStorage,$timeout,$rootScope) {
    $scope.checkLogin=function(){
      $scope.authError = null;
      $http({
        method : "GET",
        url : $rootScope.endUrl+"GeneralAPI/login",
        params : {"USER_EMAIL": $scope.userid, "USER_PASSWORD": $scope.password},
      }).then(function(response){
        $localStorage.user_id=response.data.message[0].USER_FIRST_NAME;
        $localStorage.access_token=response.data.access_token;
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
