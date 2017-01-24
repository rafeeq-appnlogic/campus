app.controller('manageClassCtrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes', 
  function($scope, $timeout, $http, editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.itemsByPage=5;
  $scope.rowCollection = [];
    $http.get('http://localhost/smartedu/api/HrConfigModule/employeeCategory').success(function(incomingData) {
          $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  $scope.deleteData = function(index) {
    var id=$scope.displayedCollection[index].EMP_C_ID;
    console.log(id,"id");
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/api/HrConfigModule/employeeCategory",
      params : {id : id},
    }).then(function mySucces(response) {
      }, function myError(response) {
    });
    
    $scope.displayedCollection.splice(index, 1);
  }
  $scope.addNewCategory = function() {
    $scope.inserted = {
      ACA_COU_NAME: null,
      ACA_COU_SEC_NAME: null,
      ACA_COU_CODE: null,
      ACA_COU_GRADE_TYPE: null,
      ACA_COU_ELECTIVE_SEL_YN:null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.saveCategory=function(user_data){
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/api/HrConfigModule/employeeCategory",
        data : { 'ACA_COU_ID':user_data.ACA_COU_ID,'ACA_COU_NAME' : user_data.ACA_COU_NAME,'ACA_COU_SEC_NAME' : user_data.ACA_COU_SEC_NAME,'ACA_COU_CODE' : user_data.ACA_COU_CODE,'ACA_COU_GRADE_TYPE' : user_data.ACA_COU_GRADE_TYPE,'ACA_COU_ELECTIVE_SEL_YN' : user_data.ACA_COU_ELECTIVE_SEL_YN}
      }).then(function mySucces(response) {
        console.log(response.data.message);
      }, function myError(response) {

      });
      $scope.itemsByPage=5;
    },200);
  }
  $scope.removeRow = function(curr_id,index) {
    // console.log(curr_id,index,'curr_id,index');
    if(!curr_id){
      $scope.displayedCollection.splice(index, 1);
    }else{
      return true;
    }    
    $scope.itemsByPage=5;
  }
}]);