app.controller('TableCtrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes', 
  function($scope, $timeout, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.rowCollection = [];
    $http.get('http://localhost/smartedu/HrConfigCtrl/employeeCategory').success(function(incomingData) {
          $scope.rowCollection = incomingData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.removeUser = function(index) {
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.displayedCollection.length+1,
      name: '',
      status: null,
      group: null 
    };
    $scope.displayedCollection.push($scope.inserted);
  };
}]);
