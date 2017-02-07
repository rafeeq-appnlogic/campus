app.controller('financecategory', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox',
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

// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }


  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get('http://localhost/smartedu/api/FinanceModule/category').success(function(incomingData) {
          $scope.rowCollection = incomingData.result;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;
  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].FINC_CA_ID;
              $http({
                method : "DELETE",
                url : "http://localhost/smartedu/api/FinanceModule/category",
                params : {id : id},
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
    $scope.FINC_CA_ID= null;
    $scope.FINC_CA_NAME=null;
    $scope.FINC_CA_DESC= null;
    $scope.FINC_CA_INCOME_YN= 'N';
  };

  $scope.saveCategory=function(user_data,$index){
      $http({
        method : "POST",
        url : "http://localhost/smartedu/api/FinanceModule/category",
        data : { 'FINC_CA_ID':$scope.FINC_CA_ID,'FINC_CA_NAME' : $scope.FINC_CA_NAME,'FINC_CA_DESC' : $scope.FINC_CA_DESC,'FINC_CA_INCOME_YN' : $scope.FINC_CA_INCOME_YN}
      }).then(function mySucces(response) {
          $scope.showMessage(response.data.message,'success'); 
      }, function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });
      setTimeout(function(){
        $scope.refreshPage(tableState);
        $scope.isLoading = false;
      },500)      

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
      url : "http://localhost/smartedu/api/FinanceModule/category",
      params : {id : data},
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
                      var cat_id=$scope.displayedCollection[i].FINC_CA_ID;
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
      $http.get('http://localhost/smartedu/api/FinanceModule/category').success(function (response, status, headers, config) {
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
  $scope.editCategory=function(curr_id){
    $scope.buttonStatus='Update';
     $http({
      method : "GET",
      url : 'http://localhost/smartedu/api/FinanceModule/category',
      params :{id : curr_id},
    }).then(function mySucces(response) {
      console.log(response.data.result[0].FINC_CA_NAME,'response');
      $scope.FINC_CA_ID=response.data.result[0].FINC_CA_ID;
      $scope.FINC_CA_NAME=response.data.result[0].FINC_CA_NAME;
      $scope.FINC_CA_DESC=response.data.result[0].FINC_CA_DESC;
      $scope.FINC_CA_INCOME_YN=response.data.result[0].FINC_CA_INCOME_YN;
    });
  }
}]);