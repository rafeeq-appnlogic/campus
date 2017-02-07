app.controller('repositoryCtrl', ['$scope','$controller','$http','$rootScope','$localStorage','$location', function($scope,$controller,$http,$rootScope,$localStorage,$location){
	
	$scope.rowCollection = [];
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

  	$http.get('http://192.168.1.136/smartedu/api/ManageClassModule/ClassDetail').success(function(response){
      console.log(response.message[0].ACA_COU_NAME,'- test');
          $scope.rowCollectionCourse = response.message;
          console.log($scope.rowCollectionBatch);
    });

  	$http.get('http://192.168.1.136/smartedu/api/ManageBatchModule/BatchDetail').success(function(response){
      console.log(response.message[0].ACA_COU_NAME,'- test');
          $scope.rowCollectionBatch = response.message;
          console.log($scope.rowCollectionBatch);
    });

    $scope.GetValue = function(user){
     // console.log(user.ACA_BAT_COU_ID);
      $scope.getData = user.ACA_COU_ID;
      var id = $scope.getData;
      //alert(JSON.stringify(user))
      console.log(JSON.stringify(user),"id");
    }

    $scope.GetBatchValue = function(user){
     // console.log(user.ACA_BAT_COU_ID);
      $scope.getBatchData = user.ACA_BAT_ID;
      var id = $scope.getData;
      //alert(JSON.stringify(user))
      console.log(JSON.stringify(user),"id");
    }

  	$http.get('http://192.168.1.136/smartedu/api/StudyRepoAPI/studyRepository').success(function(incomingData) {
        $scope.rowCollection = incomingData.message;
        console.log(incomingData.message[0],'check nodata');
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
    //$scope.displayedCollection = [].concat($scope.rowCollection);
   // $scope.displayedCollection = ;
    $scope.isLoading=false

}]);