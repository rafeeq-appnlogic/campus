app.controller('employee_Profile', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox',
  function($scope, $timeout, $http,toaster,$rootScope,$localStorage,$location,$ngBootbox) {
  
// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }
  $scope.rowCollection = [];
  $EMP_ID=$localStorage.empAdm_Id;
  $scope.access_token=$localStorage.access_token;

  $http({
      method : "GET",
      // url : "http://localhost/smartedu/api/HrEmployeeMgmntModule/employeeAdmission",
      url : $rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission",
      params :{id : $EMP_ID},
      headers:{'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      // console.log(response.data.result[0].EMP_NO,'responseresponse');
        $scope.rowCollection = response.data.result[0];
        $localStorage.empAdm_Id='';
    },function myError(response){
      console.log(response);
    });
  $scope.editdetails=function($id){
    $localStorage.edit_emp_id=$id;
  }
}]);