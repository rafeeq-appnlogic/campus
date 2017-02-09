app.controller('liabilityctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','$location','$localStorage',  
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
      $scope.access_token=$localStorage.access_token;
  
    $http.get($rootScope.endUrl+'FinanceModule/liability',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
      $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.deleteData = function(index) {
    var id=$scope.displayedCollection[index].FINC_LI_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+"FinanceModule/liability",
      params : {id : id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addLiability = function() {
    $scope.inserted = {
      FINC_LI_ID: null,
      FINC_LI_TITLE: null,
      FINC_LI_DESC: null,
      FINC_LI_AMT:null
    };
    $scope.displayedCollection.push($scope.inserted);
  }
  $scope.saveCategory=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : $rootScope.endUrl+"FinanceModule/liability",
        data : { 'FINC_LI_ID':user_data.FINC_LI_ID,'FINC_LI_TITLE' : user_data.FINC_LI_TITLE,'FINC_LI_DESC' : user_data.FINC_LI_DESC,'FINC_LI_AMT' : user_data.FINC_LI_AMT},
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