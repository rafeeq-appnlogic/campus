app.controller('stuAdmissionCtrl', ['$scope','$rootScope','$controller','$http','$localStorage', '$q', '$timeout','$element', function($scope,$rootScope,$controller,$http,$localStorage, $q,$timeout,$element){
	//console.log($scope,'ters');
	$scope.Savebutton=true;
  	$scope.Updatebutton=false;
  	$scope.saveVal=true;
  	$scope.updateVal=false;
  	$scope.access_token=$localStorage.access_token;
	$localStorage.classDetails=[];
  	$scope.Stud=[];
 //  	$scope.Stud.STU_ADM_DT=new Date();
	// $scope.Stud.STU_ADM_DOB=new Date();

	if($localStorage.classDetails.length != 0){
		$scope.Savebutton=false;
    	$scope.Updatebutton=true;
    	$scope.saveVal=false;
  		$scope.updateVal=true;
  		$scope.STD_ADM_ID=$localStorage.classDetails.STU_ADM_ID;
  		//alert($scope.STD_ADM_ID+"-"+$localStorage.classDetails.STU_ADM_ID);
		$scope.Stud.STU_ADM_ADD1=$localStorage.classDetails.STU_ADM_ADD1;
		$scope.Stud.STU_ADM_ADD2=$localStorage.classDetails.STU_ADM_ADD2;
		$scope.Stud.STU_ADM_CB_BATCH=$localStorage.classDetails.STU_ADM_CB_BATCH;
		$scope.Stud.STU_ADM_CB_COURSE=$localStorage.classDetails.STU_ADM_CB_COURSE;
		$scope.Stud.STU_ADM_CB_ROLL_NO=parseInt($localStorage.classDetails.STU_ADM_CB_ROLL_NO);
		$scope.Stud.STU_ADM_CITY=$localStorage.classDetails.STU_ADM_CITY;
		$scope.Stud.STU_ADM_COUNTRY=$localStorage.classDetails.STU_ADM_COUNTRY;
		$scope.Stud.STU_ADM_CRT_DT=$localStorage.classDetails.STU_ADM_CRT_DT;
		$scope.Stud.STU_ADM_DOB=$localStorage.classDetails.STU_ADM_DOB;
		$scope.Stud.STU_ADM_DT=$localStorage.classDetails.STU_ADM_DT;
		$scope.Stud.STU_ADM_EMAIL=$localStorage.classDetails.STU_ADM_EMAIL;
		$scope.Stud.STU_ADM_FIRST_NAME=$localStorage.classDetails.STU_ADM_FIRST_NAME;
		$scope.Stud.STU_ADM_GENDER=$localStorage.classDetails.STU_ADM_GENDER;
		$scope.Stud.STU_ADM_LAST_NAME=$localStorage.classDetails.STU_ADM_LAST_NAME;
		$scope.Stud.STU_ADM_MIDDLE_NAME=$localStorage.classDetails.STU_ADM_MIDDLE_NAME;
		$scope.Stud.STU_ADM_MOBILE=parseInt($localStorage.classDetails.STU_ADM_MOBILE);
		$scope.Stud.STU_ADM_MOTHER_TONGUE=$localStorage.classDetails.STU_ADM_MOTHER_TONGUE;
		$scope.Stud.STU_ADM_NATIONALITY=$localStorage.classDetails.STU_ADM_NATIONALITY;
		$scope.Stud.STU_ADM_NO=$localStorage.classDetails.STU_ADM_NO;
		$scope.Stud.STU_ADM_PHONE=parseInt($localStorage.classDetails.STU_ADM_PHONE);
		$scope.Stud.STU_ADM_PINCODE=parseInt($localStorage.classDetails.STU_ADM_PINCODE);
		$scope.Stud.STU_ADM_RELIGION=$localStorage.classDetails.STU_ADM_RELIGION;
		$scope.Stud.STU_ADM_STATE=$localStorage.classDetails.STU_ADM_STATE;
		$scope.Stud.STU_PA_ADD1=$localStorage.classDetails.STU_PA_ADD1;
		$scope.Stud.STU_PA_ADD2=$localStorage.classDetails.STU_PA_ADD2;
		$scope.Stud.STU_PA_ADM_NO=$localStorage.classDetails.STU_PA_ADM_NO;
		$scope.Stud.STU_PA_CITY=$localStorage.classDetails.STU_PA_CITY;
		$scope.Stud.STU_PA_COUNTRY=$localStorage.classDetails.STU_PA_COUNTRY;
		$scope.Stud.STU_PA_CRT_DT=$localStorage.classDetails.STU_PA_CRT_DT;
		$scope.Stud.STU_PA_DOB=$localStorage.classDetails.STU_PA_DOB;
		$scope.Stud.STU_PA_EDUCATION=$localStorage.classDetails.STU_PA_EDUCATION;
		$scope.Stud.STU_PA_EMAIL=$localStorage.classDetails.STU_PA_EMAIL;
		$scope.Stud.STU_PA_FIRST_NAME=$localStorage.classDetails.STU_PA_FIRST_NAME;
		$scope.Stud.STU_PA_GA_ADD1=$localStorage.classDetails.STU_PA_GA_ADD1;
		$scope.Stud.STU_PA_GA_ADD2=$localStorage.classDetails.STU_PA_GA_ADD2;
		$scope.Stud.STU_PA_GA_CITY=$localStorage.classDetails.STU_PA_GA_CITY;
		$scope.Stud.STU_PA_GA_COUNTRY=$localStorage.classDetails.STU_PA_GA_COUNTRY;
		$scope.Stud.STU_PA_GA_NAME=$localStorage.classDetails.STU_PA_GA_NAME;
		$scope.Stud.STU_PA_GA_PHONE1=parseInt($localStorage.classDetails.STU_PA_GA_PHONE1);
		$scope.Stud.STU_PA_GA_RELATION=$localStorage.classDetails.STU_PA_GA_RELATION;
		$scope.Stud.STU_PA_GA_STATE=$localStorage.classDetails.STU_PA_GA_STATE;
		$scope.Stud.STU_PA_ID=$localStorage.classDetails.STU_PA_ID;
		$scope.Stud.STU_PA_INCOME=$localStorage.classDetails.STU_PA_INCOME;
		$scope.Stud.STU_PA_LAST_NAME=$localStorage.classDetails.STU_PA_LAST_NAME;
		$scope.Stud.STU_PA_MOBILE=parseInt($localStorage.classDetails.STU_PA_MOBILE);
		$scope.Stud.STU_PA_OCCUPATION=$localStorage.classDetails.STU_PA_OCCUPATION;
		$scope.Stud.STU_PA_PHONE1=parseInt($localStorage.classDetails.STU_PA_PHONE1);
		$scope.Stud.STU_PA_PHONE2=parseInt($localStorage.classDetails.STU_PA_PHONE2);
		$scope.Stud.STU_PA_RELATION=$localStorage.classDetails.STU_PA_RELATION;
		$scope.Stud.STU_PA_STATE=$localStorage.classDetails.STU_PA_STATE;
		$scope.Stud.STU_PRE_ADD_BIRTH_PLACE=$localStorage.classDetails.STU_PRE_ADD_BIRTH_PLACE;
		$scope.Stud.STU_PRE_ADD_BLOOD_GROUP=$localStorage.classDetails.STU_PRE_ADD_BLOOD_GROUP;
		$scope.Stud.STU_PRE_ADD_IMAGE_PATH=$localStorage.classDetails.STU_PRE_ADD_IMAGE_PATH;
		$scope.Stud.STU_PRE_ADD_STUD_CATE=$localStorage.classDetails.STU_PRE_ADD_STUD_CATE;
		$scope.Stud.STU_PRE_D_COURSE=$localStorage.classDetails.STU_PRE_D_COURSE;
		$scope.Stud.STU_PRE_D_CRT_DT=$localStorage.classDetails.STU_PRE_D_CRT_DT;
		$scope.Stud.STU_PRE_D_INSTITUTE_NAME=$localStorage.classDetails.STU_PRE_D_INSTITUTE_NAME;
		$scope.Stud.STU_PRE_D_YEAR=$localStorage.classDetails.STU_PRE_D_YEAR;
		//$scope.steps.step1.$validate();
		console.log($localStorage.classDetails);
		$localStorage.classDetails=[];
	}
	
 	var allStates = 'Indian, Australian, American, Srilangan, Englishmen';
    $scope.states        = loadAll(allStates);
    $scope.selectedItem  = null;
    $scope.searchText    = null;
    $scope.querySearch   = querySearch;

    function querySearch (query) {
      var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states;
      var deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    }

    function loadAll(data) {
      return data.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }

	$scope.STU_ADM_NATIONALITY = '';
	// $scope.nationality = ('Indian Australian American Srilangan Englishmen').split(' ').map(function (nation) { return { abbrev: nation }; });

	$scope.nationality = ['Indian' ,'Australian' ,'American' ,'Srilangan' ,'Englishmen'];
	$scope.STU_ADM_MOTHER_TONGUE = '';
	$scope.mothertongue = ['Tamil' ,'English' ,'Hindi' ,'Malayalam' ,'Telugu'];
	console.log($scope.mothertongue);
	$scope.searchTerm;
      $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      // $scope.reInitialize = function(){
      // 	$element.find('input').on('keydown', function(ev) {
      //     ev.stopPropagation();
      // 	});
      // }

      $scope.reInitialize =function (){
      	console.log($element.find('input.demo-header-searchbox') , 'Element')
			$element.find('input.demo-header-searchbox').on('keydown', function(ev) {
           		ev.stopPropagation();
      		});
      }
      	

	$scope.Stud.STU_ADM_COUNTRY = '';
	$scope.countries = ('India England Australia Japan America').split(' ').map(function (country) { return { abbrev: country }; });

	var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

    $http.get($rootScope.endUrl+'ManageClassModule/ClassDetail',{headers: {'access_token':$scope.access_token}}).success(function(response){
      console.log(response.message[0].ACA_COU_NAME,'- test');
          $scope.rowCollectionCourse = response.message;
          console.log($scope.rowCollectionBatch);
    });

    $http.get($rootScope.endUrl+'ManageBatchModule/BatchDetail',{headers: {'access_token':$scope.access_token}}).success(function(response){
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

    $scope.data = { upload:[] }  // <= upload data get pushed here 
	$scope.data='http://www.chrysaliscis.com/images/avatar.png';
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

	//alert($scope.Stud.dtform);
	//$controller('DatepickerDemoCtrl', {$scope:$scope});
	$scope.saveStuAdmission = function(){
		//alert($scope.Stud.dtform);
		// console.log($scope.Stud.STU_ADM_NO);
		//alert($scope.STD_ADM_ID);
		$scope.Savebutton=true;
    	$scope.Updatebutton=false;
    	// alert($scope.Stud.STU_ADM_DT);

    	// var date = $scope.Stud.STU_ADM_DT;
     //  	var day = ('0'+(date.getDate())).slice(-2);
     //  	var month=('0'+(date.getMonth()+1)).slice(-2);
     //  	var year = date.getFullYear();
     //  	$scope.admdate = day +'-'+ month +'-'+ year ;

     //  	var dob = $scope.Stud.STU_ADM_DOB;
     //  	var day = ('0'+(dob.getDate())).slice(-2);
     //  	var month=('0'+(dob.getMonth()+1)).slice(-2);
     //  	var year = dob.getFullYear();
     //  	$scope.dobdate = day +'-'+ month +'-'+ year ;

		$http({
			method:'POST',
			url: $rootScope.endUrl+'StudentAPI/studentAdmission',
			data: {
				'STU_ADM_ID':$scope.STD_ADM_ID,
				'STU_ADM_NO' : $scope.Stud.STU_ADM_NO, 
				'STU_ADM_DT' : $scope.Stud.STU_ADM_DT, 
				'STU_ADM_FIRST_NAME' :$scope.Stud.STU_ADM_FIRST_NAME,
				'STU_ADM_MIDDLE_NAME' : $scope.Stud.STU_ADM_MIDDLE_NAME,
				'STU_ADM_LAST_NAME' :$scope.Stud.STU_ADM_LAST_NAME,
				'STU_ADM_DOB' : $scope.Stud.STU_ADM_DOB,
				'STU_ADM_GENDER' : $scope.Stud.STU_ADM_GENDER,
				'STU_ADM_NATIONALITY' : $scope.Stud.STU_ADM_NATIONALITY,
				'STU_ADM_MOTHER_TONGUE' : $scope.Stud.STU_ADM_MOTHER_TONGUE,
				'STU_ADM_RELIGION' : $scope.Stud.STU_ADM_RELIGION,
				'STU_ADM_ADD1' : $scope.Stud.STU_ADM_ADD1,
				'STU_ADM_ADD2' : $scope.Stud.STU_ADM_ADD2,
				'STU_ADM_CITY' : $scope.Stud.STU_ADM_CITY,
				'STU_ADM_STATE' : $scope.Stud.STU_ADM_STATE,
				'STU_ADM_COUNTRY' : $scope.Stud.STU_ADM_COUNTRY,
				'STU_ADM_PINCODE' : $scope.Stud.STU_ADM_PINCODE,
				'STU_ADM_PHONE' : $scope.Stud.STU_ADM_PHONE,
				'STU_ADM_MOBILE' : $scope.Stud.STU_ADM_MOBILE,
				'STU_ADM_EMAIL' : $scope.Stud.STU_ADM_EMAIL,
				// 'STU_ADM_CB_COURSE' : $scope.getData,
				// 'STU_ADM_CB_BATCH' : $scope.getBatchData,
				'STU_ADM_CB_COURSE' : $scope.Stud.STU_ADM_CB_COURSE,
				'STU_ADM_CB_BATCH' : $scope.Stud.STU_ADM_CB_BATCH,
				'STU_ADM_CB_ROLL_NO' : $scope.Stud.STU_ADM_CB_ROLL_NO},
				headers: {'access_token':$scope.access_token}
		}).then(function(response){
			//alert('Success');
			$scope.admission_no=response.data.admission_no;
		});
	}

	$scope.saveStuParentDetails = function(){

		var dobdate = $scope.Stud.STU_PA_DOB;
      	var day = ('0'+(dobdate.getDate())).slice(-2);
      	var month=('0'+(dobdate.getMonth()+1)).slice(-2);
      	var year = dobdate.getFullYear();
      	$scope.dobdate = day +'-'+ month +'-'+ year ;

		$http({
			method:'POST',
			url: $rootScope.endUrl+'StudentAPI/studentParentDetails',
			data: {
				'STU_PA_ADM_NO' : $scope.admission_no,
				 'STU_PA_FIRST_NAME' : $scope.Stud.STU_PA_FIRST_NAME,
				  'STU_PA_LAST_NAME' :$scope.Stud.STU_PA_LAST_NAME,
				  'STU_PA_RELATION' : $scope.Stud.STU_PA_RELATION,
				  'STU_PA_DOB' :$scope.dobdate,
				  'STU_PA_EDUCATION' : $scope.Stud.STU_PA_EDUCATION,
				  'STU_PA_OCCUPATION' : $scope.Stud.STU_PA_OCCUPATION,
				  'STU_PA_INCOME' : $scope.Stud.STU_PA_INCOME,
				  'STU_PA_EMAIL' : $scope.Stud.STU_PA_EMAIL,
				  'STU_PA_ADD1' : $scope.Stud.STU_PA_ADD1,
				  'STU_PA_ADD2' : $scope.Stud.STU_PA_ADD2,
				  'STU_PA_CITY' : $scope.Stud.STU_PA_CITY,
				  'STU_PA_STATE' : $scope.Stud.STU_PA_STATE,
				  'STU_PA_COUNTRY' : $scope.Stud.STU_PA_COUNTRY,
				  'STU_PA_PHONE1' : $scope.Stud.STU_PA_PHONE1,
				  'STU_PA_PHONE2' : $scope.Stud.STU_PA_PHONE2,
				  'STU_PA_MOBILE' : $scope.Stud.STU_PA_MOBILE,
				  'STU_PA_GA_NAME' : $scope.Stud.STU_PA_GA_NAME,
				  'STU_PA_GA_RELATION' : $scope.Stud.STU_PA_GA_RELATION,
				  'STU_PA_GA_ADD1' : $scope.Stud.STU_PA_GA_ADD1,
				  'STU_PA_GA_ADD2' : $scope.Stud.STU_PA_GA_ADD2,
				  'STU_PA_GA_CITY' : $scope.Stud.STU_PA_GA_CITY,
				  'STU_PA_GA_STATE' : $scope.Stud.STU_PA_GA_STATE,
				  'STU_PA_GA_COUNTRY' : $scope.Stud.STU_PA_GA_COUNTRY,
				  'STU_PA_GA_PHONE1' : $scope.Stud.STU_PA_GA_PHONE1},
				  headers: {'access_token':$scope.access_token}
		}).then(function(){
			//alert('Success');
		});
	}

	$scope.saveStudAddDetails = function(){
		var admissionData = {
				'STU_PRE_D_ADM_NO' : $scope.admission_no, 
				'STU_PRE_D_INSTITUTE_NAME' : $scope.Stud.STU_PRE_D_INSTITUTE_NAME, 
				'STU_PRE_D_COURSE' :$scope.Stud.STU_PRE_D_COURSE,
				'STU_PRE_D_YEAR' : $scope.Stud.STU_PRE_D_YEAR, 
				'STU_PRE_ADD_BLOOD_GROUP' : $scope.Stud.STU_PRE_ADD_BLOOD_GROUP,
				'STU_PRE_ADD_BIRTH_PLACE' : $scope.Stud.STU_PRE_ADD_BIRTH_PLACE,
				'STU_PRE_ADD_STUD_CATE' : $scope.Stud.STU_PRE_ADD_STUD_CATE,
				'STU_PRE_ADD_IMAGE_PATH' : $scope.Stud.STU_PRE_ADD_IMAGE_PATH
			};

			angular.forEach(admissionData, function (value, key) {
                formdata.append(key, value);
            });

		$http({
			method:'POST',
			url: $rootScope.endUrl+'StudentAPI/studentPreviousEducation',
			data: formdata,
       	 	headers: {
                'Content-Type': undefined,'access_token':$scope.access_token
            }
			// data: {
			// 	'STU_PRE_D_ADM_NO' : $scope.admission_no, 
			// 	'STU_PRE_D_INSTITUTE_NAME' : $scope.Stud.STU_PRE_D_INSTITUTE_NAME, 
			// 	'STU_PRE_D_COURSE' :$scope.Stud.STU_PRE_D_COURSE,
			// 	'STU_PRE_D_YEAR' : $scope.Stud.STU_PRE_D_YEAR, 
			// 	'STU_PRE_ADD_BLOOD_GROUP' : $scope.Stud.STU_PRE_ADD_BLOOD_GROUP,
			// 	'STU_PRE_ADD_BIRTH_PLACE' : $scope.Stud.STU_PRE_ADD_BIRTH_PLACE,
			// 	'STU_PRE_ADD_STUD_CATE' : $scope.Stud.STU_PRE_ADD_STUD_CATE,
			// 	'STU_PRE_ADD_IMAGE_PATH' : $scope.Stud.STU_PRE_ADD_IMAGE_PATH}

		}).then(function(){
			//alert('Success');
		});
	}


	// $scope.vegetables = ['Corn' ,'Onions' ,'Kale' ,'Arugula' ,'Peas', 'Zucchini'];
 //      $scope.searchTerm;
 //      $scope.clearSearchTerm = function() {
 //        $scope.searchTerm = '';
 //      };
 //      // The md-select directive eats keydown events for some quick select
 //      // logic. Since we have a search input here, we don't need that logic.
 //      // $scope.reInitialize = function(){
 //      // 	$element.find('input').on('keydown', function(ev) {
 //      //     ev.stopPropagation();
 //      // 	});
 //      // }

 //      setTimeout(function(){
 //      	console.log($element.find('input') , 'Element')
	// 		$element.find('input').on('keydown', function(ev) {
 //           		ev.stopPropagation();
 //      		});
 //      },1000);
      

}]);