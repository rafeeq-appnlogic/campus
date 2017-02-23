 
 app.controller('payrollGroup', ['$scope','$compile',function($scope,$compile) {
  
  $scope.appendClonedDiv = function() {
      // alert('yes Working');
     var iEl = angular.element( document.querySelector( '#paraID' ) );
     var wEl = angular.element( document.querySelector( '#wrapDIV' ) );
     iEl.append($compile(wEl.clone().removeClass('hidden'))($scope));
    }
    $scope.removeDiv=function(event){
      // alert('remove');
      // console.log(event,'asjhdsfijhsd');
      var data=angular.element($event.target);
      console.log(data,'asdasd');
    }
}]);