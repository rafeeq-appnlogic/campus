app.controller('empdept_ctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes', 
  function($scope, $timeout, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.itemsByPage=5;
  $scope.isLoading=true;
  $scope.rowCollection = [];
    $http.get('http://localhost/smartedu/api/HrConfigModule/employeeDepartment').success(function(incomingData) {
          $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.removeDepartment = function(index) {
    var id=$scope.displayedCollection[index].EMP_D_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/api/HrConfigModule/employeeDepartment",
      params : {id : id},
    }).then(function mySucces(response) {

      }, function myError(response) {
    });
    
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addNewDept = function() {
    $scope.inserted = {
      EMP_D_ID: null,
      EMP_D_NAME: null,
      EMP_D_CODE: null,
      EMP_D_STATUS: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.saveDepartment=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/api/HrConfigModule/employeeDepartment",
        data : { 'EMP_D_ID':user_data.EMP_D_ID,'EMP_D_NAME' : user_data.EMP_D_NAME,'EMP_D_CODE' : user_data.EMP_D_CODE,'EMP_D_STATUS' : user_data.EMP_D_STATUS}
      }).then(function mySucces(response) {
        console.log(response.data.message);
      }, function myError(response) {

      });
    },200);
  }
}]);