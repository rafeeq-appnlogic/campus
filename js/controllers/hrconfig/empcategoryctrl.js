app.controller('empcategoryctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes', 
  function($scope, $timeout, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.itemsByPage=5;
  $scope.rowCollection = [];
    $http.get('http://localhost/smartedu/api/HrConfigModule/employeeCategory').success(function(incomingData) {
          $scope.rowCollection = incomingData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.removeUser = function(index) {
    var id=$scope.displayedCollection[index].EMP_C_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/api/HrConfigModule/employeeCategory",
      params : {id : id},
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addNewCategory = function() {
    $scope.inserted = {
      EMP_C_ID: null,
      EMP_C_NAME: null,
      EMP_C_PREFIX: null,
      EMP_C_ACTIVE_YN: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.saveCategory=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/api/HrConfigModule/employeeCategory",
        data : { 'data' : user_data}
      }).then(function mySucces(response) {
        console.log(response.data.message);
      }, function myError(response) {

      });
    },200);
  }
}]);