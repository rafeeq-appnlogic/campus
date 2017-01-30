app.controller('empcategoryctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','toaster','$rootScope','$localStorage','$location','$ngBootbox','$rootScope',
  function($scope, $timeout, $http, editableOptions, editableThemes,toaster,$rootScope,$localStorage,$location,$ngBootbox,$rootScope) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.show_pagination=true;
  $scope.data='';
  $scope.status='';
  $scope.rowCollection = [];

// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }


  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get($rootScope.endUrl+'HrConfigModule/employeeCategory').success(function(incomingData) {
          $scope.rowCollection = incomingData.aaData;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;
  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].EMP_C_ID;
              $http({
                method : "DELETE",
                url : $rootScope.endUrl+"HrConfigModule/employeeCategory",
                // http://192.168.1.136/smartedu/api/HrConfigModule/employeeCategory
                params : {id : id},
              }).then(function mySucces(response) {
                    var data=response.data.message.message;
                    $scope.showMessage(data,'success');
                },function myError(response) {
                  $scope.showMessage(response.data.message,'error'); 
                })
              setTimeout(function(){
                  $scope.getMasterJobs(tableState);
                  $scope.isLoading = false;
              },600);
        });
  }
  $scope.addNewCategory = function() {
    $scope.buttonStatus='Save';
    $scope.inserted = {
      EMP_C_ID: null,
      EMP_C_NAME: null,
      EMP_C_PREFIX: null,
      EMP_C_ACTIVE_YN: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.saveCategory=function(user_data,$index){
    $scope.isLoading = true;
    setTimeout(function(){
      $http({
        method : "POST",
        url : $rootScope.endUrl+"HrConfigModule/employeeCategory",
        data : { 'EMP_C_ID':user_data.EMP_C_ID,'EMP_C_NAME' : user_data.EMP_C_NAME,'EMP_C_PREFIX' : user_data.EMP_C_PREFIX,'EMP_C_ACTIVE_YN' : user_data.EMP_C_ACTIVE_YN}
      }).then(function mySucces(response) {
          $scope.showMessage(response.data.message,'success'); 
      }, function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });
      setTimeout(function(){
        $scope.getMasterJobs(tableState);
        $scope.isLoading = false;
      },500)      
    },200);

  }
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
  $scope.multipleDelete = function(data,total_length,curr_length) {
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+"HrConfigModule/employeeCategory",
      params : {id : data},
    }).then(function mySucces(response) {
    }, function myError(response) {
    });
  }
  $scope.applyAction = function() {
     if($scope.bulkaction==1){
    $ngBootbox.confirm('Are you sure you want to delete all this record ?')
        .then(function() {
          // if($scope.bulkaction==1 && $scope.post.length > 0){
          //   var totalLength=$scope.post.length;
          //   for (var i = totalLength - 1; i >= 0; i--) {
          //     if ($scope.post[i]==true) {
          //       $scope.post[i]=false;
          //       $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID);
          //       // $scope.displayedCollection.splice(i, 1);
          //     };
          //   };
          //   $scope.showMessage("Record Deleted Successfully","success");
          //   setTimeout(function(){
          //     console.log('timeDelay');
          //     $scope.getMasterJobs(tableState);
          //   },700);
          // }
          // if($scope.selectall==1 && $scope.post.length > 0){
          //   var totalLength=$scope.itemsByPage;
          //   for (var i = totalLength - 1; i >= 0; i--) {
          //        $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID);
          //       // $scope.displayedCollection.splice(i, 1);
          //   };
          //   $scope.selectall=false;
          //   $scope.showMessage("Records Deleted Successfully","success");
          //   setTimeout(function(){
          //     console.log('timeDelay');
          //     $scope.getMasterJobs(tableState);
          //   },700);
          // }

          if($scope.bulkaction==1){
            if($scope.selectall==true || $scope.post.length > 0){
              var totalLength=$scope.displayedCollection.length;
              console.log(totalLength,'totalLengthtotalLengthtotalLength');
              for(var i=0;i<totalLength;i++){
                // if(typeof $scope.displayedCollection[i]!='undefined'){
                   if ($scope.post[i]==true) {
                      // $scope.post[i]=false;
                      var cat_id=$scope.displayedCollection[i].EMP_C_ID;
                      $scope.multipleDelete(cat_id);
                   }
                // }
              }
            }
                // console.log($scope.post,'$scope.post$scope.post');
                // if ($scope.post[i]==true) {
                //   if($scope.displayedCollection[i]!='undefined'){
                //     $scope.post[i]=false;
                //     var cat_id=$scope.displayedCollection[i].EMP_C_ID;
                //     $scope.multipleDelete(cat_id);
                //   }else {

                //   }
                  // $scope.post[i]=false;
                  // console.log($scope.displayedCollection,'$scope.displayedCollection[i]');
                  // var cat_id=$scope.displayedCollection[i].EMP_C_ID;
                  // // $scope.displayedCollection.splice(i, 1);
                  // // console.log(cat_id,'cat_idcat_id');
                  // $scope.multipleDelete(cat_id);
            //     };
            //   };
            // }
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

  $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=[];
      $http.get($rootScope.endUrl+'HrConfigModule/employeeCategory').success(function (response, status, headers, config) {
          $scope.rowCollection = response.aaData;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;
          // $scope.paginationShow();
          
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
  $scope.changeMode=function(){
    $scope.buttonStatus='Update';
  }
  // $scope.paginationShow=function(){
  //   if($scope.displayedCollection.length > $scope.itemsByPage){
  //     $scope.show_pagination=true;
  //   }else{
  //     $scope.show_pagination=false;
  //   }
  // }
}]);