app.controller('position_ctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes', 
  function($scope, $timeout, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.selectCategory=[
  {name: 'Category 1', code: 'ct001'},
  {name: 'Category 2', code: 'ct002'},
  {name: 'Category 3', code: 'ct003'},
  ];

  $scope.rowCollection = [];
    $http.get('http://localhost/smartedu/HrConfigCtrl/employeePosition').success(function(incomingData) {
          $scope.rowCollection = incomingData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.removePosition = function(index) {
    var id=$scope.displayedCollection[index].EMP_P_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/HrConfigCtrl/employeePosition",
      params : {id : id},
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addPosition = function() {
    $scope.inserted = {
      EMP_P_ID: null,
      EMP_P_CATEGORY_ID: null,
      EMP_P_NAME: null,
      EMP_P_ACTIVE_YN: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.savePosition=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/HrConfigCtrl/employeePosition",
        data : { 'data' : user_data}
      }).then(function mySucces(response) {
        console.log(response.data.message);
      }, function myError(response) {

      });
    },200);
  }
}]);