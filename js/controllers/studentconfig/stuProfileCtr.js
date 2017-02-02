app.controller('stuProfileCtr',['$scope',function($scope){
$scope.menuItems = [{Name : 'Test', hrefVal : 'Test'},{Name : 'Test1', hrefVal : 'Test1'},{Name : 'Test2', hrefVal : 'Test2'}];
$scope.activeMenu = $scope.menuItems[0];
$scope.setActive = function(menuItem) {
    $scope.activeMenu = menuItem
 }
}]);