app.controller('manageSubjectsctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','toaster','$localStorage','$location','$rootScope',
  function($scope, $timeout, $http, editableOptions, editableThemes,toaster,$localStorage,$location,$rootScope) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.noData=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.data='';
  $scope.status='';
  $scope.rowCollection = [];
  $scope.access_token=$localStorage.access_token;

  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get($rootScope.endUrl+'ManageClassModule/ClassAndBatchDetail',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
      $scope.rowCollection = incomingData.message;
      $scope.noData=false;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
    $scope.viewSubject = function(res) {
       $localStorage.ACA_COU_ID=res.ACA_COU_ID;
       $localStorage.ACA_BAT_ID=res.ACA_BAT_ID;
       $location.path('/app/view-subjects/');
    }

  /*$scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].EMP_C_ID;
              $http({
                method : "DELETE",
                url : "http://192.168.1.136/smartedu/api/HrConfigModule/employeeCategory",
                params : {id : id},
              }).then(function mySucces(response) {
                 setTimeout(function(){
                    var status="error";
                    var data=response.data.message.message;
                    $scope.showMessage(data,status);
                    $scope.getMasterJobs(tableState);
                    $scope.isLoading = false;
                  },1100);
                })

                 });
  }*/
  /*$scope.addNewCategory = function() {
    $scope.inserted = {
      EMP_C_ID: null,
      EMP_C_NAME: null,
      EMP_C_PREFIX: null,
      EMP_C_ACTIVE_YN: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };*/

  /*$scope.saveCategory=function(user_data,$index){
    $scope.isLoading = true;
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://192.168.1.136/smartedu/api/HrConfigModule/employeeCategory",
        data : { 'EMP_C_ID':user_data.EMP_C_ID,'EMP_C_NAME' : user_data.EMP_C_NAME,'EMP_C_PREFIX' : user_data.EMP_C_PREFIX,'EMP_C_ACTIVE_YN' : user_data.EMP_C_ACTIVE_YN}
      }).then(function mySucces(response) {
        setTimeout(function(){
          var status="success";
          $scope.showMessage(response.data.message,status); 
          $scope.getMasterJobs(tableState);
          $scope.isLoading = false;
        },500)   
      });      
    },200);

  }*/
  $scope.removeRow = function(curr_id,index) {
    $scope.getMasterJobs(tableState);
  }
  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }

  $scope.callbackbulk = function() {
     var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
          $scope.post[i]=$scope.selectall;
      };
  }
  /*$scope.multipleDelete = function(data,total_length,curr_length) {
    $http({
      method : "DELETE",
      url : "http://192.168.1.136/smartedu/api/HrConfigModule/employeeCategory",
      params : {id : data},
    }).then(function mySucces(response) {
    }, function myError(response) {
    });
  }*/
  $scope.applyAction = function() {
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.post.length;
      for (var i = totalLength - 1; i >= 0; i--) {
        if ($scope.post[i]==true) {
          $scope.post[i]=false;
          $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
        };
      };
      $scope.showMessage("Record Deleted Successfully","error");
    }
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
           $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
      };
      $scope.selectall=false;
      $scope.showMessage("Records Deleted Successfully","error");
    }
    setTimeout(function(){
      $scope.getMasterJobs(tableState);
    },500);
  }

  $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=[];
      $http.get($rootScope.endUrl+'ManageClassModule/ClassAndBatchDetail',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
          $scope.rowCollection = response.aaData;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;
      }).error(function (data, status, headers, config) {
          $scope.isLoading = false;
      });
  };
    $scope.currentViewCalculation=function(){
    var precal=$rootScope.currentPageNumber*$scope.itemsByPage;
    return precal-$scope.itemsByPage+1;
  }
  $scope.currentViewCalculationMax=function(){
    var maxcal=$rootScope.currentPageNumber*$scope.itemsByPage;
    if(maxcal > $scope.rowCollection.length){
      return $scope.rowCollection.length;
    }else{
      return maxcal;
    }    
  }
  
}]);