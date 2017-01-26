app.controller('bank_detailsctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes', 
  function($scope, $timeout, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.itemsByPage=5;

   // url refresh
            if($localStorage.user_id==''){
              $location.path('signin');
            }else {
              $location.path($location.url());      
            }
            
  $scope.rowCollection = [];
    $http.get('http://localhost/smartedu/api/HrConfigModule/employeeBankdetails').success(function(incomingData) {
          $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.deleteData = function(index) {
    var id=$scope.displayedCollection[index].EMP_BNK_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/api/HrConfigModule/employeeBankdetails",
      params : {id : id},
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addBankDetails = function() {
    $scope.inserted = {
      EMP_BNK_ID: null,
      EMP_BNK_NAME: null,
      EMP_BNK_ACTIVE_YN: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.saveBankDetails=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/api/HrConfigModule/employeeBankdetails",
        // data : { 'data' : user_data}
        data : { 'EMP_BNK_ID':user_data.EMP_BNK_ID,'EMP_BNK_NAME' : user_data.EMP_BNK_NAME,'EMP_BNK_ACTIVE_YN' : user_data.EMP_BNK_ACTIVE_YN}
      }).then(function mySucces(response) {
        console.log(response.data.message);
      }, function myError(response) {

      });
    },200);
  }
}]);