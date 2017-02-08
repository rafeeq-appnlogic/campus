app.controller('stuProfileCtr',['$scope','$http','$rootScope','$localStorage','$location',function($scope,$http,$rootScope,$localStorage,$location){
	//alert($localStorage.StdID)
	// $http.get({$rootScope.endUrl+'ManageClassModule/ClassDetail'}{parmas:{'STU_ADM_NO':$localStorage.StdID}})
	// .success(function(incomingData) {
 //        $scope.rowCollection = incomingData.message;
 //        console.log($scope.NoData,'check nodata');
 //        console.log(incomingData,'Row Data');
 //        // $scope.NoData=false;
 //    }).error(function(incomingData){
 //        //$scope.isLoading = true;
 //        $scope.NoData = true;
 //        var message="No Data Found in Course Details"
 //        console.log($scope.NoData,'check nodata');
 //        $scope.showMessage(message,"error");
 //        console.log(incomingData.message,'Row Data');
 //    });
 $scope.access_token=$localStorage.access_token;
$http({
      method : "GET",
      url : $rootScope.endUrl+'StudentAPI/studentDetails',
      params :{STU_ADM_NO: $localStorage.StdID},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      $scope.class=response.data.message[0];
    });

    $scope.GetStdDetail=function(row){
      //alert(JSON.stringify(row));
      $localStorage.classDetails=row;
      $location.path('/app/student-admission');
    }

}]);

