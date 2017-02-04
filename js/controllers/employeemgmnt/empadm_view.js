app.controller('empadmission_view', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox',
  function($scope, $timeout, $http,toaster,$rootScope,$localStorage,$location,$ngBootbox) {
  
// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }
  $scope.itemsByPage=5;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.rowCollection = [];
  $scope.show_pagination=true;
  $scope.post=[];

  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };

  $http.get($rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission").success(function(incomingData) {
    // console.log(incomingData.result,'incomingData.result');
        $scope.rowCollection = incomingData.result;
  });
  $scope.displayedCollection = [].concat($scope.rowCollection);

  $scope.currentViewCalculation=function(){
    var precal=$rootScope.currentPageNumber*$scope.itemsByPage;
    return precal-$scope.itemsByPage+1;
  }
  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }
  $scope.currentViewCalculationMax=function(){
    var maxcal=$rootScope.currentPageNumber*$scope.itemsByPage;
    if(maxcal > $scope.rowCollection.length){
      return $scope.rowCollection.length;
    }else{
      return maxcal;
    }    
  }
  $scope.callbackbulk = function() {
     var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
          $scope.post[i]=$scope.selectall;
      };
  }
  $scope.applyAction = function() {
    if($scope.bulkaction==1){
    $ngBootbox.confirm('Are you sure you want to delete all this record ?')
        .then(function() {
          if($scope.bulkaction==1){
            if($scope.selectall==true || $scope.post.length > 0){
              var totalLength=$scope.displayedCollection.length;
              for(var i=0;i<totalLength;i++){
                 if ($scope.post[i]==true) {
                    var cat_id=$scope.displayedCollection[i].EMP_ID;
                    $scope.multipleDelete(cat_id);
                 }
              }
            }
             $scope.selectall=false;
             $scope.showMessage("Records Deleted Successfully","success");
             setTimeout(function(){
                $scope.callbackbulk();
                $scope.getMasterJobs(tableState);
             },700);
          }
        });
      }
  }
  $scope.multipleDelete = function(data,total_length,curr_length) {
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission",
      params : {id : data},
    }).then(function mySucces(response) {

    }, function myError(response) {

    });
  }
  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              var id=$scope.displayedCollection[index].EMP_ID;
              $http({
                method : "DELETE",
                url : $rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission",
                params : {id : id},
              }).then(function mySucces(response) {
                    var data=response.data.message.message;
                    $scope.showMessage('Record Deleted Successfully','success');
                },function myError(response) {
                  $scope.showMessage('No Data Found','error'); 
                })
              setTimeout(function(){
                  $scope.getMasterJobs(tableState);
                  // $scope.isLoading = false;
              },600);
        });
  }
  $scope.openEmployeeProfile=function(emp_adm_id){
    console.log(emp_adm_id,'emp_adm_id');
    $localStorage.empAdm_Id=emp_adm_id;
  }
  $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      // $scope.isLoading = true;
      $scope.rowCollection=[];
      $http.get($rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission").success(function (response, status, headers, config) {
          $scope.rowCollection = response.result;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          // $scope.isLoading = false;
      }).error(function (data, status, headers, config) {
          // $scope.isLoading = false;
      });
  };
}]);