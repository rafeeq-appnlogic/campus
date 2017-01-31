app.controller('gradeLevelctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','toaster','$rootScope','$localStorage','$location','$ngBootbox','$rootScope',
  function($scope, $timeout, $http, editableOptions, editableThemes,toaster,$rootScope,$localStorage,$location,$ngBootbox,$rootScope) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.noData=true;
  $scope.add = true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.show_pagination=true;
  $scope.data='';
  $scope.status='';
  $scope.rowCollection = [];
  $scope.rowCollectionBatch = [];
  $scope.getData = [];
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
    $http.get('http://192.168.1.136/smartedu/api/ManageBatchModule/ViewBatchDetail').success(function(response){
          $scope.rowCollectionBatch = response.message;
          console.log($scope.rowCollectionBatch);
    });
    $scope.GetValue = function(user){
     // console.log(user.ACA_BAT_COU_ID);
      $scope.getData = user.ACA_BAT_ID;
      var id = $scope.getData;
      console.log(id,"id");
      $http({
        method : "GET",
        url : "http://192.168.1.136/smartedu/api/ManageBatchModule/GradingSystem",
        params : {GRA_SYS_BAT_ID : id},
      }).then(function mySucces(resData){
        console.log(resData.data.message);
        $scope.noData=false;
        $scope.add = false;
        $scope.rowCollection = [].concat(resData.data.message);
      });
    }
    $scope.displayedCollectionBatch = [].concat($scope.rowCollectionBatch);
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;
  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].GRA_SYS_ID;
              $http({
                method : "DELETE",
                url : "http://192.168.1.136/smartedu/api/ManageBatchModule/GradingSystem",
                // http://192.168.1.136/smartedu/api/HrConfigModule/employeeCategory
                params : {GRA_SYS_ID : id},
              }).then(function mySucces(response) {
                    var data=response.data.message.message;
                    $scope.showMessage(data,'success');
                /*},function myError(response) {
                  $scope.showMessage(response.data.message,'error'); */
                });
              setTimeout(function(){
                  $scope.getMasterJobs(tableState);
                  $scope.isLoading = false;
              },600);
        });
  }
  $scope.addNewGrade = function() {
    $scope.buttonStatus='Save';
    $scope.inserted = {
      GRA_SYS_ID: null,
      GRA_SYS_NAME : null,
      GRA_SYS_SCORE_PER: null,
      GRA_SYS_SCORE_DESC: null
    };
    $scope.displayedCollection.push($scope.inserted);
  };

  $scope.saveGrade=function(user_data,$index){
    $scope.isLoading = true;
    var param= $scope.getData;
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://192.168.1.136/smartedu/api/ManageBatchModule/GradingSystem",
        data : { 'GRA_SYS_ID':user_data.GRA_SYS_ID,'GRA_SYS_BAT_ID':param,'GRA_SYS_NAME' : user_data.GRA_SYS_NAME,'GRA_SYS_SCORE_PER' : user_data.GRA_SYS_SCORE_PER,'GRA_SYS_SCORE_DESC' : user_data.GRA_SYS_SCORE_DESC}
      }).then(function mySucces(response) {
          $scope.displayedCollection[$index].GRA_SYS_ID=response.data.GRA_SYS_ID
          var stat="success";
          var stat1="error";
          var success="grade inserted Successfully";
          var failed="grade insert Failed";
          if(response.data.status==true){
            $scope.showMessage(success,stat);
          }else{
            $scope.showMessage(failed,stat1);
          }
      /* function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });*/
      setTimeout(function(){
        $scope.getMasterJobs(tableState);
        $scope.isLoading = false;
      },500); 
      });   
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
      url : "http://192.168.1.136/smartedu/api/ManageBatchModule/GradingSystem",
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
                      var cat_id=$scope.displayedCollection[i].GRA_SYS_ID;
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
      var param= $scope.getData;
       $http({
        method : "get",
        url : "http://192.168.1.136/smartedu/api/ManageBatchModule/GradingSystem",
        /*params : {GRA_SYS_ID : param},*/
      }).then(function mySucces(response) {
         console.log(response);
          $scope.rowCollection = response.message;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;
          // $scope.paginationShow();
          
      })/*.error(function (data, status, headers, config) {
          $scope.isLoading = false;
      });*/
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