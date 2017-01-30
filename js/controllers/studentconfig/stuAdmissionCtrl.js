app.controller('stuAdmissionCtrl', ['$scope','$controller','$http', function($scope,$controller,$http){
	//console.log($scope,'ters');
	$scope.Stud=[];
	//alert($scope.Stud.dtform);
	//$controller('DatepickerDemoCtrl', {$scope:$scope});
	$scope.saveStuAdmission = function(){
		alert($scope.Stud.dtform);
		// console.log($scope.Stud.STU_ADM_NO);
		$http({
			method:'POST',
			url:'http://192.168.1.136/smartedu/api/StudentAPI/studentAdmission',
			data: {'STU_ADM_NO' : $scope.Stud.STU_ADM_NO, 'STU_ADM_DT' : '27-01-2017', 'STU_ADM_FIRST_NAME' :$scope.Stud.STU_ADM_FIRST_NAME,'STU_ADM_MIDDLE_NAME' : $scope.Stud.STU_ADM_MIDDLE_NAME,'STU_ADM_LAST_NAME' :$scope.Stud.STU_ADM_LAST_NAME,'STU_ADM_DOB' : '27-01-2017','STU_ADM_GENDER' : 'Male','STU_ADM_NATIONALITY' : $scope.Stud.STU_ADM_NATIONALITY,'STU_ADM_MOTHER_TONGUE' : $scope.Stud.STU_ADM_MOTHER_TONGUE,'STU_ADM_RELIGION' : $scope.Stud.STU_ADM_RELIGION,'STU_ADM_ADD1' : $scope.Stud.STU_ADM_ADD1,'STU_ADM_ADD2' : $scope.Stud.STU_ADM_ADD2,'STU_ADM_CITY' : $scope.Stud.STU_ADM_CITY,'STU_ADM_STATE' : $scope.Stud.STU_ADM_STATE,'STU_ADM_COUNTRY' : $scope.Stud.STU_ADM_COUNTRY,'STU_ADM_PINCODE' : $scope.Stud.STU_ADM_PINCODE,'STU_ADM_PHONE' : $scope.Stud.STU_ADM_PHONE,'STU_ADM_MOBILE' : $scope.Stud.STU_ADM_MOBILE,'STU_ADM_EMAIL' : $scope.Stud.STU_ADM_EMAIL,'STU_ADM_CB_COURSE' : $scope.Stud.STU_ADM_CB_COURSE,'STU_ADM_CB_BATCH' : $scope.Stud.STU_ADM_CB_BATCH,'STU_ADM_CB_ROLL_NO' : $scope.Stud.STU_ADM_CB_ROLL_NO}
		}).then(function(response){
			alert('Success');
			$scope.admission_no=response.data.admission_no;
			alert("response-"+$scope.admission_no)
		});
	}

	$scope.saveStuParentDetails = function(){
		$http({
			method:'POST',
			url:'http://192.168.1.136/smartedu/api/StudentAPI/studentParentDetails',
			data: {'STU_PA_ADM_NO' : $scope.admission_no, 'STU_PA_FIRST_NAME' : $scope.Stud.STU_PA_FIRST_NAME, 'STU_PA_LAST_NAME' :$scope.Stud.STU_PA_LAST_NAME,'STU_PA_RELATION' : $scope.Stud.STU_PA_RELATION,'STU_PA_DOB' :'30/1/2017','STU_PA_EDUCATION' : $scope.Stud.STU_PA_EDUCATION,'STU_PA_OCCUPATION' : $scope.Stud.STU_PA_OCCUPATION,'STU_PA_INCOME' : $scope.Stud.STU_PA_INCOME,'STU_PA_EMAIL' : $scope.Stud.STU_PA_EMAIL,'STU_PA_ADD1' : $scope.Stud.STU_PA_ADD1,'STU_PA_ADD2' : $scope.Stud.STU_PA_ADD2,'STU_PA_CITY' : $scope.Stud.STU_PA_CITY,'STU_PA_STATE' : $scope.Stud.STU_PA_STATE,'STU_PA_COUNTRY' : $scope.Stud.STU_PA_COUNTRY,'STU_PA_PHONE1' : $scope.Stud.STU_PA_PHONE1,'STU_PA_PHONE2' : $scope.Stud.STU_PA_PHONE2,'STU_PA_MOBILE' : $scope.Stud.STU_PA_MOBILE,'STU_PA_GA_NAME' : $scope.Stud.STU_PA_GA_NAME,'STU_PA_GA_RELATION' : $scope.Stud.STU_PA_GA_RELATION,'STU_PA_GA_ADD1' : $scope.Stud.STU_PA_GA_ADD1,'STU_PA_GA_ADD2' : $scope.Stud.STU_PA_GA_ADD2,'STU_PA_GA_CITY' : $scope.Stud.STU_PA_GA_CITY,'STU_PA_GA_STATE' : $scope.Stud.STU_PA_GA_STATE,'STU_PA_GA_COUNTRY' : $scope.Stud.STU_PA_GA_COUNTRY,'STU_PA_GA_PHONE1' : $scope.Stud.STU_PA_GA_PHONE1}
		}).then(function(){
			alert('Success');
		});
	}

	$scope.saveStudAddDetails = function(){
		$http({
			method:'POST',
			url:'http://192.168.1.136/smartedu/api/StudentAPI/studentPreviousEducation',
			data: {'STU_PRE_D_ADM_NO' : $scope.admission_no, 'STU_PRE_D_INSTITUTE_NAME' : $scope.Stud.STU_PRE_D_INSTITUTE_NAME, 'STU_PRE_D_COURSE' :$scope.Stud.STU_PRE_D_COURSE,'STU_PRE_D_YEAR' : $scope.Stud.STU_PRE_D_YEAR, 'STU_PRE_ADD_BLOOD_GROUP' : $scope.Stud.STU_PRE_ADD_BLOOD_GROUP,'STU_PRE_ADD_BIRTH_PLACE' : $scope.Stud.STU_PRE_ADD_BIRTH_PLACE,'STU_PRE_ADD_STUD_CATE' : $scope.Stud.STU_PRE_ADD_STUD_CATE,'STU_PRE_ADD_IMAGE_PATH' : $scope.Stud.STU_PRE_ADD_IMAGE_PATH}
		}).then(function(){
			alert('Success');
		});
	}

}]);