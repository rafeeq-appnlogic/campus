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
      // alert("User Data")
	  
	  $http({
				//url : 'http://localhost/smartedu/Payslip/pdf_generate',
				url : 'http://localhost/PDF_Generate/mpdf-codeigniter/',
				method : 'GET',
				responseType : 'arraybuffer',
				headers: {
					'Content-type' : 'application/pdf'
				},
				cache: true,
			}).success(function(data) {
				var blob = new Blob([data], { type: 'application/pdf' });
				var fileURL = URL.createObjectURL(blob);
				//alert(fileURL)
				var fileName = "1099.pdf";
				var contentFile = blob;
				var a= document.createElement('a');
				a.href= fileURL; 
				a.target= '_blank';
				//a.download= 'yourfilename.pdf';
				document.body.appendChild(a);
				a.click();
			}).error(function(data){
				alert("error"+data);
			});
	  
	  
	  
    }

    $scope.editEmailTemp = function(user){
		console.log(user.E_TEMP_ID);
		$localStorage.emailTempId=user.E_TEMP_ID;
		$localStorage.tempMode="edit";
    }
	
	$scope.deleteEmailTemp = function(user){
		user.E_TEMP_ID;
		
    }

  	$http.get($rootScope.endUrl+'EmailTemplateModule/EmailTemplate',{headers:{'access_token':$scope.access_token}}).success(function(data) {
        $scope.rowCollection = data.message;
    }).error(function(err){
        $scope.isLoading = true;
        $scope.NoData = true;
        var message="No Data Found in Email Template"
        console.log($scope.NoData,'check nodata');
        $scope.showMessage(message,"error");
        console.log(err.message,'Row Data');
    });
	setTimeout(function(){ 
		$scope.displayedCollection = [].concat($scope.rowCollection);
	    $scope.isLoading=false;
	},700);

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
	
	$scope.mail = {name: '',subject: ''}
	
	$scope.getMailto=function(){
		var answerText = $('#editor').html();
		$localStorage.tempMode='add';
		
		$http({
		method : "POST",
		url : $rootScope.endUrl+'EmailTemplateModule/EmailTemplate',
		data : {'name' : $scope.mail.name,'subject' : $scope.mail.subject,'body' : answerText,'userId':$localStorage.user_id,'tempId':$localStorage.emailTempId},
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
	
	//Edit mode
	
	if($localStorage.tempMode=='edit'){
		//alert($localStorage.emailTempId);
		$scope.submitBtn=false;
		$scope.updateBtn=true;
		$http.get($rootScope.endUrl+'EmailTemplateModule/EmailTemplate',{params:{tempId:$localStorage.emailTempId},headers:{'access_token':$scope.access_token}}).success(function(data) {
			console.log(data.message[0].E_TEMP_NAME);
			$scope.mail = {name: data.message[0].E_TEMP_NAME,subject: data.message[0].E_TEMP_SUBJECT}
			$('#editor').html(data.message[0].E_TEMP_BODY);
		}).error(function(err){
			
		});
	}else{
		$scope.submitBtn=true;
		$scope.updateBtn=false;
	}
	
	$scope.getCancel=function(){
		window.history.back();
	}
	
}]);