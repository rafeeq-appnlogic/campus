app.controller('mailTempViewCtrl', ['$scope','$controller','$http','$rootScope','$localStorage','$location', function($scope,$controller,$http,$rootScope,$localStorage,$location){
	
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

    $scope.access_token=$localStorage.access_token; 
  }

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

  	$http.get($rootScope.endUrl+'EmailTemplateModule/EmailTemplate',{headers:{'access_token':$scope.access_token}}).success(function(data) {
        $scope.rowCollection = data.message[0];
        //console.log($scope.rowCollection,'check data');
        //console.log(data,'Row Data');
        // $scope.NoData=false;
    }).error(function(err){
        //$scope.isLoading = true;
        $scope.NoData = true;
        var message="No Data Found in Email Template"
        console.log($scope.NoData,'check nodata');
        $scope.showMessage(message,"error");
        console.log(err.message,'Row Data');
    });
	setTimeout(function(){ 
		console.log($scope.rowCollection,'rowCollection')
		$scope.displayedCollection = [].concat($scope.rowCollection);
		console.log($scope.displayedCollection,'data')
	}, 1000);
	//$scope.displayedCollection = ;
    $scope.isLoading=false

}]);

app.controller('mailTempCreateCtrl', ['$scope','$controller','$http','$rootScope','$localStorage','$location', function($scope,$controller,$http,$rootScope,$localStorage,$location){
	//login auth
	// alert($localStorage.user_id +'login id');
	if($localStorage.user_id==''){
		$location.path('signin');
	}else{
		$location.path($location.url());
		$scope.access_token=$localStorage.access_token; 
	}

	$scope.mail = {type: '',subject: ''}
	
	$scope.getMailto=function(){
		var answerText = $('#editor').html();
		$http({
		method : "POST",
		url : $rootScope.endUrl+'EmailTemplateModule/EmailTemplate',
		data : {'type' : $scope.mail.type,'subject' : $scope.mail.subject,'body' : answerText,'userId':$localStorage.user_id},
		headers: {'access_token':$scope.access_token}
		}).then(function mySucces(response) {
			console.log(response);
			//$location.path('/app/page/Tempview');
			window.history.back();
			var status=response.data.status;
			var message="Email Template inserted Successfully";
			var success="success";
			console.log(status,'status');
			console.log(message,'message');
			if(status  ='true'){
				$scope.showMessage(message,success);
			}else{
				$scope.showMessage(errorMessage,error);
			}
			$scope.getMasterJobs(tableState);
		}, function myError(response) {
			var errorMessage="Email Template insertion Failed !";
			var error="error";
			$scope.showMessage(errorMessage,error);
		});
    }
	
	
}]);