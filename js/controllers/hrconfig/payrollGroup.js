app.controller('payrollGroup', ['$scope','$compile',function($scope,$compile) {
  $scope.Earningsdata=[];
  $scope.Deductiondata=[];
  //cloneing with compile
  // var iEl = angular.element( document.querySelector( '#paraID' ) );
  // var wEl = angular.element( document.querySelector( '#wrapDIV' ) );
  // iEl.append($compile(wEl.clone().removeClass('hidden'))($scope));
  $scope.addEarnings = function() {
   $scope.Earningsdata.push({valueFiled:"",lablefiled:""});
   console.log($scope.Earningsdata);
  }
  $scope.removeEarnings=function($index){
    $scope.Earningsdata.splice($index, 1);    
  }
  $scope.addDeduction = function() {
   $scope.Deductiondata.push({valueFiled:"",lablefiled:""});
   console.log($scope.Deductiondata);
  }
  $scope.removeDeduction=function($index){
    $scope.Deductiondata.splice($index, 1);     
  }

  $scope.TotalEarning=function(){
    var AdditionalEarn=0;
    angular.forEach($scope.Earningsdata, function(value) {
       // total=total+val.valueFiled;
        AdditionalEarn+=value.valueFiled;
    });
    var Basic = parseInt($scope.social1) | 0;
    var HA    = parseInt($scope.social2) | 0;
    var TA    = parseInt($scope.social3) | 0;
    var AE    = parseInt(AdditionalEarn) | 0;
    var Earnings=Basic + HA + TA + AE;
    return Earnings;

  }
  $scope.TotalDeduction=function(){
    var AdditionalDedu=0;
    angular.forEach($scope.Deductiondata, function(value) {
      AdditionalDedu+=value.valueFiled;
    });
    var IT  = parseInt($scope.socialdec1) | 0;
    var PF  = parseInt($scope.socialdec2) | 0;
    var ESI = parseInt($scope.socialdec3) | 0;
    var AD  = parseInt(AdditionalDedu)    | 0;
    var Deductions=IT + PF + ESI + AD;
    return Deductions;
  }
  $scope.Netpay=function(){
    // alert('Netpay');
    var netpay=$scope.TotalEarning() - $scope.TotalDeduction();
    console.log(netpay,'PAYS SHCFVDJ')
    console.log($scope.TotalEarning(),'NetPay123');
    return netpay;
  }
}]);