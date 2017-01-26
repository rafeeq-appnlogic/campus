app.controller('assetctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','$location','$localStorage', 
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
      
    $http.get('http://localhost/smartedu/api/FinanceModule/Asset').success(function(incomingData) {
      $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.deleteData = function(index) {
    var id=$scope.displayedCollection[index].FINC_AS_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/api/FinanceModule/Asset",
      params : {id : id},
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addAsset = function() {
    $scope.inserted = {
      FINC_AS_ID: null,
      FINC_AS_TITLE: null,
      FINC_AS_DESC: null,
      FINC_AS_AMT:null
    };
    $scope.displayedCollection.push($scope.inserted);
  }
  $scope.saveCategory=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/api/FinanceModule/Asset",
        data : { 'FINC_AS_ID':user_data.FINC_AS_ID,'FINC_AS_TITLE' : user_data.FINC_AS_TITLE,'FINC_AS_DESC' : user_data.FINC_AS_DESC,'FINC_AS_AMT' : user_data.FINC_AS_AMT}
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