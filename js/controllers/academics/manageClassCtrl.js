app.controller('manageClassCtrl', ['$scope','$rootScope','$timeout','$http', 'editableOptions', 'editableThemes','toaster', 
  function($scope,$rootScope,$timeout, $http, editableOptions, editableThemes,toaster) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.data='';
  $scope.status='';
  $scope.Savedata=[];
  $scope.rowCollection = [];
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get($rootScope.endUrl+'ManageClassModule/ClassDetail').success(function(incomingData) {
          $scope.rowCollection = incomingData.message;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
  // $scope.deleteData = function(index) {
  //   var id=$scope.displayedCollection[index].EMP_C_ID;
  //   console.log(id,"id");
  //   $http({
  //     method : "DELETE",
  //     url : "http://localhost/smartedu/api/HrConfigModule/employeeCategory",
  //     params : {id : id},
  //   }).then(function mySucces(response) {
  //       console.log(response.data.message.message);
  //       var status="error";
  //       var data=response.data.message.message;
  //       $scope.showMessage(data,status);
  //     }, function myError(response) {
  //   });    
  //   $scope.displayedCollection.splice(index, 1);

  //   $scope.getMasterJobs(tableState);
  // }
  // $scope.addNewCategory = function() {
  //   $scope.inserted = {
  //     EMP_C_ID: null,
  //     EMP_C_NAME: null,
  //     EMP_C_PREFIX: null,
  //     EMP_C_ACTIVE_YN: null
  //   };
  //   $scope.displayedCollection.push($scope.inserted);
  // };

  $scope.saveCategory=function(){    
	alert($scope.ACA_BAT_START_DT);
	alert($scope.ACA_BAT_END_DT);
	$http({
		method : "POST",
		url : $rootScope.endUrl+'ManageClassModule/ClassAndBatchDetail',
		data : {'ACA_COU_NAME' : $scope.ACA_COU_NAME,'ACA_COU_SEC_NAME' : $scope.ACA_COU_SEC_NAME,'ACA_COU_CODE' : $scope.ACA_COU_CODE,'ACA_COU_GRADE_TYPE':$scope.ACA_COU_GRADE_TYPE,'ACA_COU_ELECTIVE_SEL_YN':$scope.ACA_COU_ELECTIVE_SEL_YN,'ACA_BAT_NAME':$scope.ACA_BAT_NAME,'ACA_BAT_START_DT':'25-01-2016','ACA_BAT_END_DT':'25-01-2017'}
	}).then(function mySucces(response) {
		console.log(response,'response');
		// console.log($scope.displayedCollection[$index].EMP_C_ID=response.data.EMP_C_ID);
		// $scope.displayedCollection[$index].ACA_COU_ID=response.data.ACA_COU_ID
		// $scope.Savedata=[];
		// var status="success";
		//  $scope.showMessage(response.data.message,status);
	}, function myError(response) {

	});
	$scope.getMasterJobs(tableState);
  }
  
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};
  
  
  $scope.removeRow = function(curr_id,index) {
    console.log(curr_id,index,'curr_id,index');
    if(!curr_id){
      $scope.displayedCollection.splice(index, 1);
    }else{
      return true;
    }    
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
    // console.log(total_length-1,'total_length',curr_length,'curr_length');
    // var status1;
    // var data1;
    $http({
      method : "DELETE",
      url : "http://localhost/smartedu/api/HrConfigModule/employeeCategory",
      params : {id : data},
    }).then(function mySucces(response) {
        // status1="error";
        // data1=response.data.message.message;
    }, function myError(response) {
    });
    // console.log(data1,status1);
    // $scope.status=status1;
    // $scope.data=data1;
    // console.log($scope.data,$scope.status);
    // $scope.showMessage(data,status);
  }
  $scope.applyAction = function() {
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.post.length;
      // console.log(totalLength,'totalLength');
      // $scope.deletedItem=[];
      for (var i = totalLength - 1; i >= 0; i--) {
        if ($scope.post[i]==true) {
          $scope.post[i]=false;
          // $scope.deletedItem.push($scope.displayedCollection[i].EMP_C_ID);
          $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
        };
      };
      $scope.showMessage("Record Deleted Successfully","error");
      // $scope.multipleDelete($scope.deletedItem);
    }
    if($scope.bulkaction==1 && $scope.post.length > 0){
      var totalLength=$scope.itemsByPage;
      // $scope.deletedItem=[];
      for (var i = totalLength - 1; i >= 0; i--) {
          // $scope.deletedItem.push($scope.displayedCollection[i].EMP_C_ID);
           $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID,totalLength,i);
          $scope.displayedCollection.splice(i, 1);
      };
      $scope.selectall=false;
      $scope.showMessage("Records Deleted Successfully","error");
      // $scope.multipleDelete($scope.deletedItem);
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