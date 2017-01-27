app.controller('manageBatchCtrl', ['$scope','$rootScope','$localStorage','$timeout','$http','$modal','editableOptions', 'editableThemes','toaster', 
  function($scope,$rootScope,$localStorage,$timeout, $http,$modal,editableOptions, editableThemes,toaster) {
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
    var id=$localStorage.Class_id;
    console.log(id,'BatchDetail');
    // alert("Class_id-"+id);
    $http({
      method : "GET",
      url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
      params :{ACA_COU_ID : id},
    }).then(function mySucces(response) {
    console.log(response,'tes')
        $scope.rowCollection = response.data.message;
        console.log(response.data.message,'datas');
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false

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
  $scope.saveBatch=function(){
    // alert('in');
    // console.log($scope.Batch,'Test');
  $http({
    method : "POST",
    url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
    data : {'ACA_BAT_COU_ID':id,'ACA_BAT_NAME' : $scope.Batch.ACA_BAT_NAME,'ACA_BAT_START_DT' : $scope.Batch.ACA_BAT_START_DT,'ACA_BAT_END_DT' : $scope.Batch.ACA_BAT_END_DT,'ACA_BAT_IMP_PRE_BAT_SUB_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_SUB_YN,'ACA_COU_ELECTIVE_SEL_YN':$scope.Batch.ACA_COU_ELECTIVE_SEL_YN,'ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN}
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
    }, function myError(response) {
       var error="error";
       var errorMessage="Batch insert Failed";
       $scope.showMessage(errorMessage,error);
    });
    // $scope.testForm=false;
    }
  // $scope.GetBatchView=function(id){
  //   $localStorage.Class_id=id.ACA_COU_ID;
  //   }
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
       var error="error";
       var errorMessage="There is Not Batch avaiable in this Clsss";
       $scope.showMessage(errorMessage,error);
    });
  };
  $scope.updateBatch=function(){
    $http({
    method : "POST",
    url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
    data : {'ACA_BAT_ID':$scope.Batch.ACA_BAT_ID,'ACA_BAT_COU_ID':id,'ACA_BAT_NAME' : $scope.Batch.ACA_BAT_NAME,'ACA_BAT_START_DT' : $scope.Batch.ACA_BAT_START_DT,'ACA_BAT_END_DT' : $scope.Batch.ACA_BAT_END_DT,'ACA_BAT_IMP_PRE_BAT_SUB_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_SUB_YN,'ACA_COU_ELECTIVE_SEL_YN':$scope.Batch.ACA_COU_ELECTIVE_SEL_YN,'ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN':$scope.Batch.ACA_BAT_IMP_PRE_BAT_MASTER_FEE_YN}
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
  $scope.DeleteClass=function(row){
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
      $scope.getMasterJobs(tableState);
    },function myError(response){
      var message=response.data.message;
      $scope.showMessage(message,error);
    });
    console.log(id,'remove');
    $scope.displayedCollection.splice(id, 1);
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
    console.log($scope.bulkaction,'delete check');
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.post.length;
      console.log(totalLength,'length');
      for (var i = totalLength - 1; i >= 0; i--) {
        if ($scope.post[i]==true) {
          $scope.post[i]=false;
          $scope.multipleDelete($scope.displayedCollection[i].ACA_BAT_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
        };
      };
      $scope.showMessage("Record Deleted Successfully","error");
    }
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
           $scope.multipleDelete($scope.displayedCollection[i].ACA_BAT_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
      };
      $scope.selectall=false;
      $scope.showMessage("Records Deleted Successfully","error");
    }
    $scope.getMasterJobs(tableState);
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
        url : $rootScope.endUrl+'ManageBatchModule/BatchDetail',
        params :{ACA_COU_ID : id},
      }).then(function mySucces(response, status, headers, config) {
        console.log(response);
          $scope.rowCollection = response.data.message;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;
      }).error(function (data, status, headers, config) {
          console.error(data);
          $scope.isLoading = false;
      });
      $scope.displayedCollection = [].concat($scope.rowCollection);
      $scope.isLoading=false
  };
}]);