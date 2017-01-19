'use strict';

/* Controllers */

  // config controller
app.controller('hrconfig', ['$scope','$http', function($scope,$http) {
    $scope.payrollGroup = false;
    $scope.batch='';
    $scope.createCategory=function(){
      var name=$scope.cat_name;
      var prefix=$scope.prefix;
      if($scope.status == true){
        var status='Y';
      }else if($scope.status == false){
        var status='N';
      }
      console.log(name,prefix,status);
      // $http({
      //     method  : 'POST',
      //     url     : 'http://localhost/smartedu/HrConfigCtrl/employeeCategory',
      //     data    : {name:name,prefix:prefix,status:status},
      //     headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      //    }).success(function(data){
      //     console.log(data.status);
      //     if(data.status=='true'){
      //     }
      //    })
    };
    $scope.createDept=function(){
      var name=$scope.dept_name;
      var prefix=$scope.dept_code;
      if($scope.status == true){
        var status='Y';
      }else if($scope.status == false){
        var status='N';
      }
      console.log(name,prefix,status);
    };

    $scope.getSubject=function(){
      console.log($scope.batch);
      // $scope.batch='batcha';


    }
     $scope.getDept=function(){
      console.log('');

    }
    
}]);
