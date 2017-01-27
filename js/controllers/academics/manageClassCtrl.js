app.controller('manageClassCtrl', ['$scope','$rootScope','$localStorage','$timeout','$http','$modal','editableOptions', 'editableThemes','toaster', 
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
  $scope.class=[];
  $scope.Savebutton=true;
  $scope.Updatebutton=false;
  $scope.Edit=false;
  $scope.Save=false;
  $scope.rowCollection = [];
  $scope.saveDatas= [];
  // $scope.testForm=false;
  $scope.class.ACA_COU_ELECTIVE_SEL_YN="N";
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get($rootScope.endUrl+'ManageClassModule/ClassDetail').success(function(incomingData) {
          $scope.rowCollection = incomingData.message;
          console.log(incomingData,'Row Data');
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false

  $scope.addNewClass = function() {
    // $scope.testForm=true;
    $scope.Save=true;
    $scope.Edit=false;
    $scope.batch=true;
    $scope.Savebutton=true;
    $scope.Updatebutton=false;
    $scope.class = {
      ACA_COU_ID: null,
      ACA_COU_NAME: null,
      ACA_COU_SEC_NAME: null,
      ACA_COU_CODE: null,
      ACA_COU_ELECTIVE_SEL_YN:"N",
      ACA_BAT_NAME:null,
      ACA_BAT_START_DT:null,
      ACA_BAT_END_DT:null
    };
    // $scope.displayedCollection.push($scope.class);
  };
  $scope.saveClass=function(){
  $http({
    method : "POST",
    url : $rootScope.endUrl+'ManageClassModule/ClassAndBatchDetail',
    data : {'ACA_COU_NAME' : $scope.class.ACA_COU_NAME,'ACA_COU_SEC_NAME' : $scope.class.ACA_COU_SEC_NAME,'ACA_COU_CODE' : $scope.class.ACA_COU_CODE,'ACA_COU_GRADE_TYPE':$scope.class.ACA_COU_GRADE_TYPE,'ACA_COU_ELECTIVE_SEL_YN':$scope.class.ACA_COU_ELECTIVE_SEL_YN,'ACA_BAT_NAME':$scope.class.ACA_BAT_NAME,'ACA_BAT_START_DT':'25-01-2016','ACA_BAT_END_DT':'25-01-2017'}
   }).then(function mySucces(response) {
    var status=response.data.status;
    var message="Class inserted Successfully";
    var errorMessage="Class insert Failed";
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
    });
   // $scope.testForm=false;
    }
  $scope.GetBatchView=function(id){
    $localStorage.Class_id=id.ACA_COU_ID;
    alert($localStorage.Class_id);
    }
  $scope.EditClass=function(id){
    // $scope.testForm=true;
    $scope.Save=false;
    $scope.Edit=true;
    $scope.batch=false;
    $scope.Savebutton=false;
    $scope.Updatebutton=true;
    var id=id.ACA_COU_ID;
    $http({
      method : "GET",
      url : $rootScope.endUrl+'ManageClassModule/ClassDetail',
      params :{ACA_COU_ID : id},
    }).then(function mySucces(response) {
      $scope.class=[];
      $scope.class=response.data.message[0];
      // console.log($scope.class,'responsedata');
      // $scope.class.ACA_COU_NAME=response.data.message[0]['ACA_COU_NAME'];
      // $scope.class.ACA_COU_SEC_NAME=response.data.message[0]['ACA_COU_SEC_NAME'];
      // $scope.class.ACA_COU_CODE=response.data.message[0]['ACA_COU_CODE'];
      // $scope.class.ACA_COU_GRADE_TYPE=response.data.message[0]['ACA_COU_GRADE_TYPE'];
      // $scope.class.ACA_COU_ELECTIVE_SEL_YN=response.data.message[0]['ACA_COU_ELECTIVE_SEL_YN'];
      // $scope.class.ACA_COU_ID=response.data.message[0]['ACA_COU_ID'];
    });
  };
  $scope.updateClass=function(){    alert($scope.class.ACA_COU_ID)
    $http({
    method : "POST",
    url : $rootScope.endUrl+'ManageClassModule/ClassAndBatchDetail',
    data : {'ACA_COU_ID' : $scope.class.ACA_COU_ID,'ACA_COU_NAME' : $scope.class.ACA_COU_NAME,'ACA_COU_SEC_NAME' : $scope.class.ACA_COU_SEC_NAME,'ACA_COU_CODE' : $scope.class.ACA_COU_CODE,'ACA_COU_GRADE_TYPE':$scope.class.ACA_COU_GRADE_TYPE,'ACA_COU_ELECTIVE_SEL_YN':$scope.class.ACA_COU_ELECTIVE_SEL_YN,'ACA_BAT_NAME':$scope.class.ACA_BAT_NAME,'ACA_BAT_START_DT':'25-01-2016','ACA_BAT_END_DT':'25-01-2017'}
    }).then(function mySucces(response) {
    var status=response.data.status;
    var message="Class is Updated Successfully";
    var Errormessage="Class Update is Failed";
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
    });
    // $scope.testForm=false;
  }
  $scope.DeleteClass=function(row){
    var id=row.ACA_COU_ID;
    $http({
      method:"DELETE",
      url : $rootScope.endUrl+'ManageClassModule/ClassDetail',
      params:{ACA_COU_ID : id},
    }).then(function mySucces(response){
      var success="success";
      var error="error";
      console.log(response);
      var message=response.data.message;
      $scope.showMessage(message,success);
    },function myError(response){

    });
    console.log(id,'remove');
    $scope.displayedCollection.splice(id, 1);
    $scope.getMasterJobs(tableState);
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
    console.log($scope.bulkaction,'delete check');
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.post.length;
      console.log(totalLength,'length');
      for (var i = totalLength - 1; i >= 0; i--) {
        if ($scope.post[i]==true) {
          $scope.post[i]=false;
          $scope.multipleDelete($scope.displayedCollection[i].ACA_COU_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
        };
      };
      $scope.showMessage("Record Deleted Successfully","error");
    }
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
           $scope.multipleDelete($scope.displayedCollection[i].ACA_COU_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
      };
      $scope.selectall=false;
      $scope.showMessage("Records Deleted Successfully","error");
    }
    $scope.getMasterJobs(tableState);
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

          //set the number of pages so the pagination can update
          // tableState.pagination.numberOfPages = response.numberOfPages;
          // $scope.displayedPages = Math.ceil(response.numberOfPages / length);
          $scope.isLoading = false;
      }).error(function (data, status, headers, config) {
          console.error(data);
          $scope.isLoading = false;
      });
  };
}]);