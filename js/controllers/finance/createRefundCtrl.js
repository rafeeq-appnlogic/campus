app.controller('createRefundCtrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','toaster','$localStorage','$location','$ngBootbox','$rootScope','$mdDialog',
  function($scope, $timeout, $http, editableOptions, editableThemes,toaster,$localStorage,$location,$ngBootbox,$rootScope,$mdDialog) {

  $scope.showAdvanced = function(ev,mode,data) {
    console.log(mode == 'Add');
    if(mode == 'Add'){
      $rootScope.temp_subject = null;
    }else if(mode == 'Edit'){
      $rootScope.temp_subject = data;
    }
    $scope.Subject=data;
    $mdDialog.show({
     controller: DialogController,
      templateUrl: 'tpl/Finance/createRefundModal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(mode,data) {
      //$scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      //$scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog, $localStorage, $rootScope) {

    $scope.Save=true;
    $scope.Edit=false;
    $scope.subject=true;
    $scope.Savebutton=true;
    $scope.Updatebutton=false;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    
  $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=[];
      var paramOne = $localStorage.ACA_COU_ID;
      var paramTwo = $localStorage.ACA_BAT_ID;
       $http({
        method : "get",
        // url : "http://192.168.1.136/smartedu/api/ManageBatchModule/SubjectDetail",
        url : $rootScope.endUrl+"ManageBatchModule/manageSubjectView",
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
          $scope.rowCollection = response.data.message;
          console.log(response.data.message , 'XXXXX');
          $scope.displayedCollection = [].concat(response.data.message);
          $scope.isLoading = false;
      })/*.error(function (data, status, headers, config) {
          $scope.isLoading = false;
      });*/
  };

  $scope.removeRow = function(curr_id,index) {
    $scope.getMasterJobs(tableState);
  }
  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }

  }

  $scope.callbackbulk = function() {
     var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
          $scope.post[i]=$scope.selectall;
      };
  }
  $scope.multipleDelete = function(data,total_length,curr_length) {
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+"ManageBatchModule/SubjectDetail",
      params : {ACA_SUB_ID : data},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
    }, function myError(response) {
    });
  }
   $scope.applyAction = function() {
     if($scope.bulkaction==1){
    $ngBootbox.confirm('Are you sure you want to delete all this record ?')
        .then(function() {
          

          if($scope.bulkaction==1){
            if($scope.selectall==true || $scope.post.length > 0){
              var totalLength=$scope.displayedCollection.length;
              console.log(totalLength,'totalLengthtotalLengthtotalLength');
              for(var i=0;i<totalLength;i++){
                // if(typeof $scope.displayedCollection[i]!='undefined'){
                   if ($scope.post[i]==true) {
                      // $scope.post[i]=false;
                      var cat_id=$scope.displayedCollection[i].ACA_SUB_ID;
                      $scope.multipleDelete(cat_id);
                   }
                // }
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
  $scope.changeMode=function(){
    $scope.buttonStatus='Update';
  }
}]);