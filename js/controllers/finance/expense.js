app.controller('expenseCtrl', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox',
  function($scope, $timeout, $http, toaster,$rootScope,$localStorage,$location,$ngBootbox) {
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
// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }
$scope.access_token=$localStorage.access_token;

  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get($rootScope.endUrl+'FinanceTxnModule/expense',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
          $scope.rowCollection = incomingData.result;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;

    // categoryList
    $http.get($rootScope.endUrl+'FinanceTxnModule/categoryList',{headers: {'access_token':$scope.access_token}}).success(function(response) {
          $scope.categoryList = response.result;
    });

  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].FINC_TXN_EX_ID;
              $http({
                method : "DELETE",
                url : $rootScope.endUrl+"FinanceTxnModule/expense",
                params : {id : id},
                headers: {'access_token':$scope.access_token}
              }).then(function mySucces(response) {
                    var data=response.data.message.message;
                    $scope.showMessage(data,'success');
                },function myError(response) {
                  $scope.showMessage(response.data.message,'error'); 
                })
              setTimeout(function(){
                  $scope.refreshPage(tableState);
                  $scope.isLoading = false;
              },600);
        });
  }
  $scope.openModel = function() {
    $scope.buttonStatus='Save';
    $scope.Exp.FINC_TXN_EX_ID= null;
    $scope.Exp.FINC_TXN_EX_CA_ID=null;
    $scope.Exp.FINC_TXN_EX_TITLE= null;
    $scope.Exp.FINC_TXN_EX_DESC= null;
    $scope.Exp.FINC_TXN_EX_AMT= null;
    $scope.Exp.FINC_TXN_EX_DT= null;
    $scope.Exp.FINC_TXN_EX_STATUS= 'N';
  };

  $scope.saveExpense=function(user_data,$index){
    console.log($scope.Exp.FINC_TXN_EX_DT,'$scope.Exp.FINC_TXN_EX_DT');
      $http({
        method : "POST",
        url : $rootScope.endUrl+"FinanceTxnModule/expense",
        data : { 
          'FINC_TXN_EX_ID':$scope.Exp.FINC_TXN_EX_ID,'FINC_TXN_EX_CA_ID' : $scope.Exp.FINC_TXN_EX_CA_ID,
          'FINC_TXN_EX_TITLE' : $scope.Exp.FINC_TXN_EX_TITLE,'FINC_TXN_EX_DESC' : $scope.Exp.FINC_TXN_EX_DESC,
          'FINC_TXN_EX_AMT' : $scope.Exp.FINC_TXN_EX_AMT,'FINC_TXN_EX_DT' : $scope.Exp.FINC_TXN_EX_DT,
          'FINC_TXN_EX_STATUS' : $scope.Exp.FINC_TXN_EX_STATUS
        },
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
          $scope.showMessage(response.data.message,'success'); 
      }, function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });
      setTimeout(function(){
        $scope.refreshPage(tableState);
        $scope.isLoading = false;
      },500);     

  }
  $scope.removeRow = function(curr_id,index) {
    $scope.refreshPage(tableState);
  }
  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }

  $scope.callbackbulk = function() {
     var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
          $scope.post[i]=$scope.selectall;
      };
  }
  $scope.multipleDelete = function(data,total_length,curr_length) {
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+"FinanceTxnModule/expense",
      params : {id : data},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
    }, function myError(response) {
    });
  }
  $scope.applyAction = function() {
     if($scope.bulkaction==1){
    $ngBootbox.confirm('Are you sure you want to delete all this record ?')
        .then(function() {
          if($scope.bulkaction==1){
            if($scope.selectall==true || $scope.post.length > 0){
              var totalLength=$scope.displayedCollection.length;
              console.log(totalLength,'totalLengthtotalLengthtotalLength');
              for(var i=0;i<totalLength;i++){
                   if ($scope.post[i]==true) {
                      var cat_id=$scope.displayedCollection[i].FINC_TXN_EX_ID;
                      $scope.multipleDelete(cat_id);
                   }
              }
            }
             $scope.selectall=false;
             $scope.showMessage("Records Deleted Successfully","success");
             setTimeout(function(){
                $scope.callbackbulk();
                $scope.refreshPage(tableState);
             },700);
          }
        });
      }
  }

  $scope.refreshPage = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=[];
      $http.get($rootScope.endUrl+'FinanceTxnModule/expense',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
          $scope.rowCollection = response.result;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;          
      }).error(function (data, status, headers, config) {
          $scope.isLoading = false;
      });
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
  $scope.changeMode=function(){
    $scope.buttonStatus='Update';
  }
  $scope.editExpense=function(curr_id){
    $scope.buttonStatus='Update';
     $http({
      method : "GET",
      url : $rootScope.endUrl+'FinanceTxnModule/expense',
      params :{id : curr_id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      $scope.Exp=response.data.result[0];
    });
  }
}]);