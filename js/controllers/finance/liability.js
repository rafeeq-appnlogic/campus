app.controller('liabilityctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes', 
  function($scope, $timeout, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.itemsByPage=5;
  $scope.rowCollection = [];
    $http.get('http://localhost/smartedu/api/FinanceModule/liability').success(function(incomingData) {
      $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.deleteData = function(index) {
    var id=$scope.displayedCollection[index].FINC_LI_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/api/FinanceModule/liability",
      params : {id : id},
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
        url : "http://localhost/smartedu/api/FinanceModule/liability",
        data : { 'FINC_LI_ID':user_data.FINC_LI_ID,'FINC_LI_TITLE' : user_data.FINC_LI_TITLE,'FINC_LI_DESC' : user_data.FINC_LI_DESC,'FINC_LI_AMT' : user_data.FINC_LI_AMT}
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