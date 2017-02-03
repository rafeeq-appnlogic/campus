app.controller('employeeMgmnt', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox',
  function($scope, $timeout, $http,toaster,$rootScope,$localStorage,$location,$ngBootbox) {
  
// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }

  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }

  $scope.empAdm=[];
  $scope.empCont=[];
  $scope.empAdd=[];
  $scope.return_id='';

// Insert Employee Admission Details
  $scope.saveEmployeeDetails=function(){
      $http({
        method : "POST",
        url : $rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission",
        // url : "http://localhost/smartedu/api/HrEmployeeMgmntModule/employeeAdmission",
        data : { 
                'EMP_ID':$scope.return_id,
                'EMP_NO':$scope.empAdm.EMP_NO,
                'EMP_JOIN_DT':$scope.empAdm.EMP_JOIN_DT,
                'EMP_FIRST_NAME':$scope.empAdm.EMP_FIRST_NAME,
                'EMP_LAST_NAME':$scope.empAdm.EMP_LAST_NAME,
                'EMP_GENDER':$scope.empAdm.EMP_GENDER,
                'EMP_DOB':$scope.empAdm.EMP_DOB,
                'EMP_MARITAL_STATUS':$scope.empAdm.EMP_MARITAL_STATUS,
                'EMP_RELIGION':$scope.empAdm.EMP_RELIGION,
                'EMP_BLOOD_GROUP':$scope.empAdm.EMP_BLOOD_GROUP,
                'EMP_NATIONALITY':$scope.empAdm.EMP_NATIONALITY,
                'EMP_PROFILE':$scope.empAdm.EMP_PROFILE,
                'EMP_DEPT':$scope.empAdm.EMP_DEPT,
                'EMP_CATEGORY':$scope.empAdm.EMP_CATEGORY,
                'EMP_POSITION':$scope.empAdm.EMP_POSITION,
                'EMP_GRADE':$scope.empAdm.EMP_GRADE,
                'EMP_JOB_TITLE':$scope.empAdm.EMP_JOB_TITLE,
                'EMP_QUALI':$scope.empAdm.EMP_QUALI,
                'EMP_EXPE_INFO':$scope.empAdm.EMP_EXPE_INFO,
                'EMP_TOT_EXPE':$scope.empAdm.EMP_TOT_EXPE,
                'EMP_ADD_1':$scope.empCont.EMP_ADD_1,
                'EMP_ADD_2':$scope.empCont.EMP_ADD_2,
                'EMP_CITY':$scope.empCont.EMP_CITY,
                'EMP_STATE':$scope.empCont.EMP_STATE,
                'EMP_PINCODE':$scope.empCont.EMP_PINCODE,
                'EMP_COUNTRY':$scope.empCont.EMP_COUNTRY,
                'EMP_PHONE':$scope.empCont.EMP_PHONE,
                'EMP_OFF_PHONE':$scope.empCont.EMP_OFF_PHONE,
                'EMP_MOBILE':$scope.empCont.EMP_MOBILE,
                'EMP_EMAIL':$scope.empCont.EMP_EMAIL,
                'EMP_ACC_NAME':$scope.empAdd.EMP_ACC_NAME,
                'EMP_ACC_NO':$scope.empAdd.EMP_ACC_NO,
                'EMP_BANK_NAME':$scope.empAdd.EMP_BANK_NAME,
                'EMP_BANK_BRANCH_NAME':$scope.empAdd.EMP_BANK_BRANCH_NAME,
                'EMP_PASSPORT_NO':$scope.empAdd.EMP_PASSPORT_NO,
                'EMP_PAN_NO':$scope.empAdd.EMP_PAN_NO,
                'EMP_ADHAR_NO':$scope.empAdd.EMP_ADHAR_NO,
                'EMP_WORK_PERMIT':$scope.empAdd.EMP_WORK_PERMIT      
        }
      }).then(function mySucces(response) {
          console.log(response.data.message);
          $scope.return_id=response.data.message.INS_EMP_ID;
          $scope.showMessage(response.data.message.message,"success");
      }, function myError(response) {
        console.log(response);
        // $scope.showMessage(response.data.message.message,"error");
      });   
  }
}]);