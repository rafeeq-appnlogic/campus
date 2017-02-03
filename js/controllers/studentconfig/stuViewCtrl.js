app.controller('stuViewCtrl', ['$scope','$rootScope','$localStorage','$location','$timeout','$http','$modal','editableOptions', 'editableThemes','toaster','$ngBootbox',
  function($scope,$rootScope,$localStorage,$location,$timeout, $http,$modal,editableOptions, editableThemes,toaster,$ngBootbox) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.batch=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.data='';
  $scope.status='';
  $scope.class=[];
  $scope.Savebutton=true;
  $scope.Updatebutton=false;
  $scope.Edit=false;
  $scope.Save=false;
  $scope.NoData=false;
  $scope.rowCollection = [];
  $scope.saveDatas= [];
  // $scope.testForm=false;
  //$scope.class.ACA_COU_ELECTIVE_SEL_YN="N";
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
  //login auth//
  // alert($localStorage.user_id +'login id');
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }
  //----------------------------//

    $http.get($rootScope.endUrl+'StudentAPI/studentDetails').success(function(incomingData) {
      // alert(incomingData);
        $scope.rowCollection = incomingData.message;
        console.log($scope.NoData,'check nodata');
        console.log(incomingData,'Row Data');
        // $scope.NoData=false;
    }).error(function(incomingData){
        //$scope.isLoading = true;
        $scope.NoData = true;
        var message="No Data Found in Course Details"
        console.log($scope.NoData,'check nodata');
        $scope.showMessage(message,"error");
        console.log(incomingData.message,'Row Data');
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
    //$scope.NoData=false;

    //GetStdDetail

    $scope.GetStdDetail=function(row){
      //alert(JSON.stringify(row));
      $localStorage.StdID=row.STU_ADM_NO;
      $location.path('/app/viewStudDetails');
    }
   
    $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }

  $scope.callbackbulk = function() {
     var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
          $scope.post[i]=$scope.selectall;
          console.log($scope.post[i],'check');
      };
  }
  $scope.multipleDelete = function(data,total_length,curr_length) {
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+'ManageClassModule/ClassDetail',
      params : {ACA_COU_ID : data},
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
                   if ($scope.post[i]==true) {
                      var cat_id=$scope.displayedCollection[i].ACA_COU_ID;
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
  $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $http.get($rootScope.endUrl+'ManageClassModule/ClassDetail').success(function (response, status, headers, config) {
          $scope.rowCollection = response.message;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;
      }).error(function (response,data, status, headers, config) {
          console.error(data);
          // $scope.isLoading = true;
          $scope.NoData = true;
          var message="No Data Found in Course Details"
          console.log($scope.NoData,'check nodata');
          $scope.showMessage(message,"error");
          console.log(response.message,'Row Data');

      });
  };

  $scope.currentViewCalculation=function(){
    var precal=$scope.currentPageNumber*$scope.itemsByPage;
    // console.log(precal-$scope.itemsByPage+1,'ads');
    return precal-$scope.itemsByPage+1;
  }
  $scope.currentViewCalculationMax=function(){
    var maxcal=$scope.currentPageNumber*$scope.itemsByPage;
    console.log(maxcal+"====" +$scope.rowCollection.length)
    if(maxcal > $scope.rowCollection.length){
      return $scope.rowCollection.length;
    }else{
      return maxcal;
    }    
  }
}]);