app.controller('manageBatchMasterCtrl', ['$scope','$rootScope','$localStorage','$location','$timeout','$http','$modal','editableOptions', 'editableThemes','toaster','$ngBootbox', 
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
  $scope.Batch=[];
  $scope.Savebutton=true;
  $scope.Updatebutton=false;
  $scope.NoData=false;
  // $scope.Edit=false;
  // $scope.Save=false;
  $scope.rowCollection = [];
  $scope.saveDatas= [];
  // $scope.testForm=false;
  $scope.Batch.ACA_BAT_IMP_PRE_BAT_SUB_YN="N";
  $scope.Batch.ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN="N";
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    //login auth//
    if($localStorage.user_id==''){
      $location.path('signin');
    }else {
      $location.path($location.url());      
    }
    //----------------------------//

    $http.get('http://192.168.1.136/smartedu/api/ManageClassModule/ClassDetail').success(function(response){
      console.log(response.message[0].ACA_COU_NAME,'- test');
          $scope.rowCollectionBatch = response.message;
          console.log($scope.rowCollectionBatch);
    });

    var id=$localStorage.Class_id;
    console.log(id,'BatchDetail');
    // alert("Class_id-"+id);
    $http({
      method : "GET",
      url : $rootScope.endUrl+'ManageClassModule/courseandbatchview'
    }).then(function mySucces(response) {
    console.log(response,'tes')
        $scope.rowCollection = response.data.message;
        console.log(response.data.message,'datas');
    },function myError(response){
      // $scope.isLoading = true;
      $scope.NoData=true;
      var message="No Batch Found in This Course"
      console.log($scope.NoData,'check nodata');
      $scope.showMessage(message,"error");
      console.log(response.message,'Row Data');
      });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;

  $scope.addBatch = function() {
    // $scope.testForm=true;
    $scope.Save=true;
    $scope.Edit=false;
    $scope.batch=true;
    $scope.Savebutton=true;
    $scope.Updatebutton=false;
    $scope.Batch = {
      ACA_BAT_NAME:null,
      ACA_BAT_START_DT:null,
      ACA_BAT_END_DT:null,
      ACA_BAT_IMP_PRE_BAT_SUB_YN:"N",
      ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN:"N"
    };
    // $scope.displayedCollection.push($scope.class);
  };

  $scope.GetValue = function(user){
     // console.log(user.ACA_BAT_COU_ID);
      $scope.getData = user.ACA_COU_ID;
      var id = $scope.getData;
      //alert(JSON.stringify(user))
      console.log(JSON.stringify(user),"id");
    }

  $scope.saveBatch=function(){

      var date = $scope.Batch.ACA_BAT_START_DT;
      alert(date);
      var day = ('0'+(date.getDate())).slice(-2);
      var month=('0'+(date.getMonth()+1)).slice(-2);
      var year = date.getFullYear();
      $scope.datestart = day +'-'+ month +'-'+ year ;

      var date1 = $scope.Batch.ACA_BAT_END_DT;
      var day = ('0'+(date1.getDate())).slice(-2);
      var month=('0'+(date1.getMonth()+1)).slice(-2);
      var year = date1.getFullYear();
      $scope.dateend = day +'-'+ month +'-'+ year ;

    var ACA_BAT_CRT_USER_ID=$localStorage.user_id;
    console.log(ACA_BAT_CRT_USER_ID,'insertid');
    $http({
      method : "POST",
      url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
      data : {
        'ACA_BAT_COU_ID':$scope.getData,
        'ACA_BAT_NAME' : $scope.Batch.ACA_BAT_NAME,
        'ACA_BAT_START_DT' : $scope.datestart,
        'ACA_BAT_END_DT' : $scope.dateend,
        'ACA_BAT_IMP_PRE_BAT_SUB_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_SUB_YN,
        'ACA_COU_ELECTIVE_SEL_YN':$scope.Batch.ACA_COU_ELECTIVE_SEL_YN,
        'ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN,
        'ACA_BAT_CRT_USER_ID':ACA_BAT_CRT_USER_ID}
     }).then(function mySucces(response) {
      var status=response.data.status;
      var message="Batch inserted Successfully";
      var errorMessage="Batch insert Failed";
      var success="success";
      var error="error";
      console.log(status,'status');
      console.log(message,'message');
      if(status  ='true'){
        $scope.showMessage(message,success);
    }else{
      $scope.showMessage(errorMessage,error);
    }
    $scope.getMasterJobs(tableState);
    },function myError(response) {
       var error="error";
       var errorMessage="Batch insert Failed";
       $scope.showMessage(errorMessage,error);
    });
    // $scope.testForm=false;
  }
  $scope.EditBatch=function(id){
    // $scope.testForm=true;
    $scope.Save=false;
    $scope.Edit=true;
    $scope.batch=false;
    $scope.Savebutton=false;
    $scope.Updatebutton=true;
    var id=id.ACA_BAT_ID;
    // alert(user_id);
    $http({
      method : "GET",
      url : $rootScope.endUrl+'ManageBatchModule/Batch',
      params :{ACA_BAT_ID : id},
    }).then(function mySucces(response) {
      console.log(response,'test');
      $scope.Batch=[];
      $scope.Batch=response.data.message[0];
    },function myError(response) {
    });
  };
  $scope.updateBatch=function(){
    var ACA_BAT_UPD_USER_ID=$localStorage.user_id;
    console.log(ACA_BAT_UPD_USER_ID,'updateid');
    $http({
    method : "POST",
    url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
    data : {
      'ACA_BAT_ID':$scope.Batch.ACA_BAT_ID,
      'ACA_BAT_COU_ID':id,'ACA_BAT_NAME' : $scope.Batch.ACA_BAT_NAME,
      'ACA_BAT_START_DT' : $scope.Batch.ACA_BAT_START_DT,
      'ACA_BAT_END_DT' : $scope.Batch.ACA_BAT_END_DT,
      'ACA_BAT_IMP_PRE_BAT_SUB_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_SUB_YN,
      'ACA_COU_ELECTIVE_SEL_YN':$scope.Batch.ACA_COU_ELECTIVE_SEL_YN,
      'ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN,
      'ACA_BAT_UPD_USER_ID':ACA_BAT_UPD_USER_ID}
    }).then(function mySucces(response) {
    var status=response.data.status;
    var message="Batch is Updated Successfully";
    var Errormessage="Batch Update is Failed";
    console.log(status,'status');
    console.log(message,'message');
    var success="success";
    var error="error";
    if(status  ='true'){
        $scope.showMessage(message,success);
    }else{
      $scope.showMessage(Errormessage,error);
    }
    $scope.getMasterJobs(tableState);
    }, function myError(response) {
      var Errormessage="Batch Update is Failed";
      var error="error";
      $scope.showMessage(Errormessage,error);
    });
    // $scope.testForm=false;
  }
  $scope.DeleteBatch=function(row){
    $ngBootbox.confirm('Are you sure you want to delete this record?').then(function(){
    var id=row.ACA_BAT_ID;
    $http({
      method:"DELETE",
      url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
      params:{ACA_BAT_ID : id},
    }).then(function mySucces(response){
      var success="success";
      var error="error";
      console.log(response);
      var message=response.data.message;
      $scope.showMessage(message,success);
      console.log(id,'remove');
      $scope.displayedCollection.splice(id, 1);
      $scope.getMasterJobs(tableState);
    },function myError(response){
      var message=response.data.message;
      $scope.showMessage(message,error);
    });
    });
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
      url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
      params : {ACA_BAT_ID : data},
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
                      var cat_id=$scope.displayedCollection[i].ACA_BAT_ID;
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
      var id=$localStorage.Class_id;
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $http({
        method : "GET",
        url : $rootScope.endUrl+'ManageClassModule/courseandbatchview'
      }).then(function mySucces(response, status, headers, config) {
        console.log(response);
          $scope.rowCollection = response.data.message;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;

      },function myError(response){
          // $scope.isLoading = true;
          $scope.NoData=true;
          var message="No Batch Found in This Course"
          console.log($scope.NoData,'check nodata');
          $scope.showMessage(message,"error");
          console.log(response.message,'Row Data');
      });
      $scope.displayedCollection = [].concat($scope.rowCollection);
      $scope.isLoading=false
  };
    $scope.currentViewCalculation=function(){
      var precal=$scope.currentPageNumber*$scope.itemsByPage;
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