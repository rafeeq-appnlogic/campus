 
 app.controller('payrollGroup', ['$scope',function($scope) {
  
  $scope.payrollCategory=[];
  $scope.payrollCategory=[{categoryType:"<i class='fa fa-bars iconBar'></i>"},{categoryType:"<i class='fa fa-bars iconBar'></i>"},{categoryType:"<i class='fa fa-bars iconBar'></i>"}];
  console.log($scope.payrollCategory);
}]);