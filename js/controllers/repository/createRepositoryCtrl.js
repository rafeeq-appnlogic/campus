app.controller('createRepositoryCtrl', ['$scope','$controller','$http','$localStorage', function($scope,$controller,$http,$localStorage){
	$scope.Study = [];
	var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

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

	$scope.saveRepositoryDetails = function(){
		var repData = {
			"STY_REP_COU_ID":$scope.Study.STY_REP_COU_ID,
			"STY_REP_BAT_ID":$scope.Study.STY_REP_BAT_ID,
			"STY_REP_TITLE":$scope.Study.STY_REP_TITLE,
			"STY_REP_CONTENT":$scope.Study.STY_REP_CONTENT,
			"STY_REP_DESC":$scope.Study.STY_REP_DESC,
			"STY_REP_FILE_PATH":$scope.Study.STY_REP_FILE_PATH,
		};
		angular.forEach(repData, function(value,key){
			formdata.append(key,value);
		})
		$http({
			method:'POST',
			url:'http://192.168.1.136/smartedu/api/StudyRepoAPI/studyRepository',
			data: formdata,
			headers: {
                'Content-Type': undefined
            }
		}).then(function(response){
				//alert('Success');
				console.log(response);
				//$scope.admission_no=response.data.admission_no;
		});
	}

}]);