app.controller('employeeMgmnt', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox','$element',
  function($scope, $timeout, $http,toaster,$rootScope,$localStorage,$location,$ngBootbox,$element) {

// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }

$scope.data = { upload:[] }  // <= upload data get pushed here 
$scope.data='http://www.chrysaliscis.com/images/avatar.png';

            var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
                angular.forEach($files, function (value, key) {
                    formdata.append(key, value);
                });
                console.log($files,"$files")
            };

$scope.access_token=$localStorage.access_token;

  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }
    
  // $scope.empAdm=[];
  // $scope.empCont=[];
  // $scope.empAdd=[];
  $scope.empAdm=[];
  $scope.empCont=[];
  $scope.empAdd=[]; 
  $scope.return_id='';
  // $scope.EMP_JOIN_DT=new Date();

  // $scope.EMP_MARITAL_STATUS = '';
  // $scope.maritalstatus = ['single' ,'Married','Divorced'];
  // $scope.EMP_BLOOD_GROUP = '';
  // $scope.bloodgroup = ['A+ve' ,'B+ve' ,'O+ve' ,'A-ve'];
  // $scope.STU_ADM_NATIONALITY = '';
  // $scope.nationality = ['Indian' ,'Australian' ,'American' ,'Srilangan' ,'Englishmen'];
  // $scope.EMP_DEPT = '';
  // $scope.department = ['English' ,'Hindi' ,'Maths' ,'Science' ,'Social'];
  // $scope.EMP_CATEGORY = '';
  // $scope.empcategory = ['Finance' ,'Human Resource' ,'Librarion' ,'Teacher' ,'System Admin'];
  // $scope.EMP_POSITION = '';
  // $scope.selectposition = ['Lab Assistant' ,'System Admin'];
  // $scope.EMP_GRADE = '';
  // $scope.empgrade = ['Grade 1' ,'Grade 2','Grade 3'];
  // $scope.EMP_TOT_EXPE = '';
  // $scope.experience = ['Grade 1' ,'Grade 2','Grade 3'];
  // $scope.EMP_CITY = '';
  // $scope.selectcity = ['Chennai' ,'Coimbatore','Pondicherry','Cuddalore','Villupram'];
  // $scope.EMP_STATE = '';
  // $scope.selectstate = ['Tamilnadu' ,'Mumbai','Delhi','Pune'];
  // $scope.EMP_COUNTRY = '';
  // $scope.selectcountry = ['Australia' ,'India','UK','Dubai'];
 /* console.log($scope.mothertongue);*/
  $scope.searchTerm;
      $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      // $scope.reInitialize = function(){
      //  $element.find('input').on('keydown', function(ev) {
      //     ev.stopPropagation();
      //  });
      // }

      $scope.reInitialize =function (){
        console.log($element.find('input.demo-header-searchbox') , 'Element')
      $element.find('input.demo-header-searchbox').on('keydown', function(ev) {
              ev.stopPropagation();
          });
      }

 /* $scope.martial = '';
  $scope.status = ('Single Married Divorced').split(' ').map(function (status) { return { abbrev: status }; });
  $scope.bloodGroup = '';
  $scope.bloodgp = ('A+ve B+ve O+ve A-ve').split(' ').map(function (bloodgp) { return { abbrev: bloodgp }; });
  $scope.nationality = '';
  $scope.nation = ('US Antarctica India SriLanga UK').split(' ').map(function (nation) { return { abbrev: nation }; });
  $scope.department = '';
  $scope.depart = ('English Hindi Science Maths Social SystemAdmin').split(' ').map(function (depart) { return { abbrev: depart }; });
  $scope.category = '';
  $scope.selectCat = ('Finance HumanResource Librarion Teacher SystemAdmin').split(' ').map(function (selectCat) { return { abbrev: selectCat }; });
  $scope.position = '';
  $scope.selectPosition = ('SystemAdmin LabAssistant').split(' ').map(function (selectPosition) { return { abbrev: selectPosition }; });
  $scope.grade = '';
  $scope.selectGrade = ('Grade1 Grade2 Grade3').split(' ').map(function (selectGrade) { return { abbrev: selectGrade }; });
  $scope.experience = '';
  $scope.totalExp = ('0Year 1Year 2Year 3Year 4Year').split(' ').map(function (totalExp) { return { abbrev: totalExp }; });*/


// Insert Employee Admission Details
  $scope.saveEmployeeDetails=function(){
    var admissionData={ 
                'EMP_ID':$scope.return_id,
                'EMP_NO':$scope.empAdm.EMP_NO,
                'EMP_JOIN_DT':$scope.empAdm.EMP_JOIN_DT,
                'EMP_FIRST_NAME':$scope.empAdm.EMP_FIRST_NAME,
                'EMP_LAST_NAME':$scope.empAdm.EMP_LAST_NAME,
                'EMP_GENDER':$scope.empAdm.EMP_GENDER,
                'EMP_DOB':$scope.empAdm.EMP_DOB,
                'EMP_MARITAL_STATUS':$scope.empAdm.EMP_MARITAL_STATUS,
                'EMP_RELIGION':$scope.empAdm.EMP_RELIGION,
                'EMP_BLOOD_GROUP':$scope.empAdm.EMP_BLOOD_GROUP,
                'EMP_NATIONALITY':$scope.empAdm.EMP_NATIONALITY,
                'EMP_PROFILE':$scope.empAdm.EMP_PROFILE,
                'EMP_DEPT':$scope.empAdm.EMP_DEPT,
                'EMP_CATEGORY':$scope.empAdm.EMP_CATEGORY,
                'EMP_POSITION':$scope.empAdm.EMP_POSITION,
                'EMP_GRADE':$scope.empAdm.EMP_GRADE,
                'EMP_JOB_TITLE':$scope.empAdm.EMP_JOB_TITLE,
                'EMP_QUALI':$scope.empAdm.EMP_QUALI,
                'EMP_EXPE_INFO':$scope.empAdm.EMP_EXPE_INFO,
                'EMP_TOT_EXPE':$scope.empAdm.EMP_TOT_EXPE,
                'EMP_ADD_1':$scope.empCont.EMP_ADD_1,
                'EMP_ADD_2':$scope.empCont.EMP_ADD_2,
                'EMP_CITY':$scope.empCont.EMP_CITY,
                'EMP_STATE':$scope.empCont.EMP_STATE,
                'EMP_PINCODE':$scope.empCont.EMP_PINCODE,
                'EMP_COUNTRY':$scope.empCont.EMP_COUNTRY,
                'EMP_PHONE':$scope.empCont.EMP_PHONE,
                'EMP_OFF_PHONE':$scope.empCont.EMP_OFF_PHONE,
                'EMP_MOBILE':$scope.empCont.EMP_MOBILE,
                'EMP_EMAIL':$scope.empCont.EMP_EMAIL,
                'EMP_ACC_NAME':$scope.empAdd.EMP_ACC_NAME,
                'EMP_ACC_NO':$scope.empAdd.EMP_ACC_NO,
                'EMP_BANK_NAME':$scope.empAdd.EMP_BANK_NAME,
                'EMP_BANK_BRANCH_NAME':$scope.empAdd.EMP_BANK_BRANCH_NAME,
                'EMP_PASSPORT_NO':$scope.empAdd.EMP_PASSPORT_NO,
                'EMP_PAN_NO':$scope.empAdd.EMP_PAN_NO,
                'EMP_ADHAR_NO':$scope.empAdd.EMP_ADHAR_NO,
                'EMP_WORK_PERMIT':$scope.empAdd.EMP_WORK_PERMIT
              };
              console.log(admissionData,"$scope.empAdm[0]");
              angular.forEach(admissionData, function (value, key) {
                formdata.append(key, value);
              });

      $http({
        method : "POST",
        // url : $rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission",
        url : "http://localhost/smartedu/api/HrEmployeeMgmntModule/employeeAdmission",
        data: formdata,
        headers: {
                        'Content-Type': undefined,'access_token':$scope.access_token
                    }
      }).then(function mySucces(response) {
          console.log(response.data.message);
          $scope.return_id=response.data.message.INS_EMP_ID;
          $scope.showMessage(response.data.message.message,"success");
           // setTimeout(function(){
           //    $location.path('app/employee-details');
           //  },100);
      }, function myError(response) {
        console.log(response);
        // $scope.showMessage(response.data.message.message,"error");
      });   
  }
  $EMP_ID=$localStorage.edit_emp_id;  
  console.log($localStorage.edit_emp_id,'EMP_ID');
  if($localStorage.edit_emp_id!=''){
  $http({
      method : "GET",
      // url : "http://localhost/smartedu/api/HrEmployeeMgmntModule/employeeAdmission",
      url : $rootScope.endUrl+"HrEmployeeMgmntModule/employeeAdmission",
      params :{id : $EMP_ID},
      headers:{'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      // console.log(response.data.result[0],'responseresponse');
        $scope.return_id=response.data.result[0].EMP_ID;
        $scope.empAdm = response.data.result[0];
        $scope.empCont = response.data.result[0];
        $scope.empAdd = response.data.result[0];
        $localStorage.edit_emp_id='';
    },function myError(response){
      console.log(response);
    });
  }
}]);