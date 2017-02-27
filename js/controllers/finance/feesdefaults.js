app.controller('feesdefaultCtrl', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox','$mdDialog',
  function($scope, $timeout, $http, toaster,$rootScope,$localStorage,$location,$ngBootbox,$mdDialog) {
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

  $scope.listData=[{stu_name:"Senthil",roll_no:'CS001',batch:'CSE',adm_No:'ADM001'},
          {stu_name:"Vijay", roll_no:'CS002',batch:'CSE',adm_No:'ADM002'},
          {stu_name:"Karthik", roll_no:'EC001',batch:'ECE',adm_No:'ADM003'},
          {stu_name:"Mani", roll_no:'CS003',batch:'CSE',adm_No:'ADM004'},
          {stu_name:"Jay", roll_no:'IT002',batch:'IT',adm_No:'ADM005'},
          {stu_name:"Raj",roll_no:'EC002',batch:'ECE',adm_No:'ADM006'}];

 $scope.access_token=$localStorage.access_token;
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };

    $scope.rowCollection=$scope.listData;
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
          $scope.displayedCollection=$scope.listData;
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