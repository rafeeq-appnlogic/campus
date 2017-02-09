app.controller('financecategoryctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','$location','$localStorage','$rootScope', 
  function($scope, $timeout, $http, editableOptions, editableThemes,$location,$localStorage,$rootScope) {
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

      $scope.access_token=$localStorage.access_token;

    $http.get($rootScope.endUrl+'HrConfigModule/employeeCategory',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
          $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.deleteData = function(index) {
    var id=$scope.displayedCollection[index].FINC_CA_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+"HrConfigModule/employeeCategory",
      params : {id : id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addNewCategory = function() {
    $scope.inserted = {
      FINC_CA_ID: null,
      FINC_CA_NAME: null,
      FINC_CA_DESC: null,
      FINC_CA_INCOME_YN: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.saveCategory=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : $rootScope.endUrl+"HrConfigModule/employeeCategory",
        data : { 'FINC_CA_ID':user_data.FINC_CA_ID,'FINC_CA_NAME' : user_data.FINC_CA_NAME,'FINC_CA_DESC' : user_data.FINC_CA_DESC,'FINC_CA_INCOME_YN' : user_data.FINC_CA_INCOME_YN},
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
        console.log(response.data.message);
      }, function myError(response) {

      });
    },200);
  }
  $scope.removeRow = function(curr_id,index) {
    // console.log(curr_id,index,'curr_id,index');
    if(!curr_id){
      $scope.displayedCollection.splice(index, 1);
    }else{
      return true;
    }    
  }
}]);