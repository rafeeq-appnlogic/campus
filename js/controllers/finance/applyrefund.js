app.controller('refundview', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox','$mdDialog',
  function($scope, $timeout, $http, toaster,$rootScope,$localStorage,$location,$ngBootbox,$mdDialog) {
  $scope.isLoading=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.show_pagination=true;
  $scope.data='';
  $scope.status='';
  $scope.rowCollection = [];
  $scope.Exp=[];
  $scope.categoryList=[];
  $scope.FINC_TXN_EX_DT=new Date();
// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }

  $scope.listData=[{stu_name:"Senthil", amount:"325.00", date:'05-25-2017', fee_col_name:"Term 2 fee collection",refund_by:"admin",vou_no:2},
          {stu_name:"Vijay", amount:"3825.00", date:'03-25-2016', fee_col_name:"Fee for std_ c1-g4",refund_by:"User",vou_no:3},
          {stu_name:"Karthik", amount:"4825.00", date:'25-25-2016', fee_col_name:"Term 2 fee collection",refund_by:"admin",vou_no:1},
          {stu_name:"Mani", amount:"3215.00", date:'22-25-2016', fee_col_name:"Fee for std_ c1-g4",refund_by:"admin",vou_no:2},
          {stu_name:"Mani", amount:"1825.00", date:'17-25-2017', fee_col_name:"Term 2 fee collection",refund_by:"User",vou_no:5},
          {stu_name:"Raj", amount:"2825.00", date:'03-25-2016', fee_col_name:"Term 2 fee collection",refund_by:"admin",vou_no:8}];

 $scope.access_token=$localStorage.access_token;
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };

$scope.rowCollection=$scope.listData;
    // $http.get($rootScope.endUrl+'FinanceTxnModule/expense',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
    //       $scope.rowCollection = incomingData.result;
    // });
    // $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.displayedCollection=$scope.listData

  $scope.callbackbulk = function() {
     var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
          $scope.post[i]=$scope.selectall;
      };
  }
  $scope.refreshPage = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=$scope.listData;
      // $http.get($rootScope.endUrl+'FinanceTxnModule/expense',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
      //     $scope.rowCollection = response.result;
          // $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.displayedCollection=$scope.listData;
    
      // }).error(function (data, status, headers, config) {
      //     $scope.isLoading = false;
      // });
  };
 
   $scope.currentViewCalculation=function(){
    var precal=$rootScope.currentPageNumber*$scope.itemsByPage;
    return precal-$scope.itemsByPage+1;
  }
  $scope.currentViewCalculationMax=function(){
    var maxcal=$rootScope.currentPageNumber*$scope.itemsByPage;
    if(maxcal > $scope.rowCollection.length){
      return $scope.rowCollection.length;
    }else{
      return maxcal;
    }    
  }
}]);