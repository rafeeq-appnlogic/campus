app.controller('managestud_catctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','$location','$localStorage',
  function($scope, $timeout, $http, editableOptions, editableThemes,$location,$localStorage) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.itemsByPage=5;
  $scope.rowCollection = [];

   // url refresh
      if($localStorage.user_id==''){
        $location.path('signin');
      }else {
        $location.path($location.url());      
      }

      
    $http.get('http://localhost/smartedu/HrConfigCtrl/employeeCategory').success(function(incomingData) {
          $scope.rowCollection = incomingData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.removeUser = function(index) {
    var id=$scope.displayedCollection[index].STU_CATE_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/HrConfigCtrl/employeeCategory",
      params : {id : id},
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addNewCategory = function() {
    $scope.inserted = {
      STU_CATE_ID: null,
      STU_CATE_TYPE_NAME: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };
   $scope.saveCategory=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/HrConfigCtrl/employeeCategory",
        data : { 'data' : user_data}
      }).then(function mySucces(response) {
        console.log(response.data.message);
      }, function myError(response) {

      });
    },200);
  }
}]);