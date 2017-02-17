app.controller('feecategoryctrl', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox','$mdDialog',
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
  $scope.Inc=[];
  $scope.classList=[];
  $scope.classArray=[];
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
    $http.get($rootScope.endUrl+'FinanceFeesModule/feesCategory',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
          $scope.rowCollection = incomingData.result;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;

    // Get course Details
    $http.get($rootScope.endUrl+'ManageClassModule/ClassDetail',{headers: {'access_token':$scope.access_token}}).success(function(response){
          $scope.classList = response.message;
    });


  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].FINC_S_CA_ID;
              $http({
                method : "DELETE",
                url : $rootScope.endUrl+"FinanceFeesModule/feesCategory",
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
 /* $scope.openModel = function() {
    $scope.buttonStatus='Save';
    $scope.FINC_S_CA_ID= null;
    $scope.FINC_S_CA_NAME=null;
    $scope.FINC_S_CA_DESC= null;
    $scope.FINC_S_CA_BATCH= null;
  };*/

  $scope.showAdvanced = function(ev,mode,data) {
    
    console.log(mode =='Add');
    console.log(mode ,'modetype');
    console.log(data ,'datatype');
    if(mode == 'Add')
    {
      $rootScope.temp_catdata = null;
    }else if(mode == 'Edit')
    {
      console.log(data , 'ccc');
      $rootScope.temp_catdata = data;
    }
   
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tpl/finance_module/feecategoryModal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(mode, data) {
      // $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope,$mdDialog, $rootScope, $localStorage) {
    $scope.rowCollection = [];
     $scope.cat=[];
    console.log($rootScope.temp_catdata , 'aaaa');
    $scope.categoryList=[];
    $scope.buttonStatus='Save';
    $scope.access_token=$localStorage.access_token;
    if($rootScope.temp_catdata == null)
    {
      $scope.Save=true;
      $scope.Edit=false;
      $scope.buttonStatus='Save';
      $scope.cat = {
        FINC_S_CA_ID : null,
        FINC_S_CA_NAME : null,
        FINC_S_CA_DESC : null,
        FINC_S_CA_BATCH : null
    }
    }else{
      console.log($rootScope.temp_catdata ,'zzzz');
      $scope.Save=false;
      $scope.Edit=true;
      $scope.buttonStatus='Update';
      $scope.FINC_S_CA_ID = $rootScope.temp_catdata.FINC_S_CA_ID;
      $scope.FINC_S_CA_NAME = $rootScope.temp_catdata.FINC_S_CA_NAME;
      $scope.FINC_S_CA_DESC = $rootScope.temp_catdata.FINC_S_CA_DESC;
      $scope.FINC_S_CA_BATCH = $rootScope.temp_catdata.FINC_S_CA_BATCH;

      console.log($scope.FINC_S_CA_BATCH,'batch');
     /* $scope.Exp = $rootScope.temp_catdata;*/
    }

    // Get course Details
    $http.get($rootScope.endUrl+'ManageClassModule/ClassDetail',{headers: {'access_token':$scope.access_token}}).success(function(response){
          $scope.classList = response.message;
          console.log($scope.classList,'dropvalue');
    });

    $scope.saveCategory=function($index){
      $mdDialog.hide();
    // $scope.classArray=$scope.FINC_S_CA_BATCH;
    // var ClassData=$scope.classArray.join(',');
    // console.log($scope.FINC_S_CA_ID,$scope.FINC_S_CA_NAME,$scope.FINC_S_CA_DESC,ClassData,'ssss');
      $http({
        method : "POST",
        url : $rootScope.endUrl+"FinanceFeesModule/feesCategory",
        data : { 
          'FINC_S_CA_ID':$scope.FINC_S_CA_ID,'FINC_S_CA_NAME' : $scope.FINC_S_CA_NAME,
          'FINC_S_CA_DESC' : $scope.FINC_S_CA_DESC,'FINC_S_CA_BATCH' : $scope.FINC_S_CA_BATCH
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
    $scope.refreshPage = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=[];
      $http.get($rootScope.endUrl+'FinanceTxnModule/income',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
          $scope.rowCollection = response.result;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;          
      }).error(function (data, status, headers, config) {
          $scope.isLoading = false;
      });
    };
     $scope.removeRow = function(curr_id,index) {
      $scope.refreshPage(tableState);
    }
    $scope.showMessage=function(data,status){
      toaster.pop(status, data);
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };


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
      url : $rootScope.endUrl+"FinanceFeesModule/feesCategory",
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
                      var cat_id=$scope.displayedCollection[i].FINC_S_CA_ID;
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
      $http.get($rootScope.endUrl+'FinanceFeesModule/feesCategory',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
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
      url : $rootScope.endUrl+'FinanceFeesModule/feesCategory',
      params :{id : curr_id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      console.log(response.data.result[0],'responseEdit');
      $scope.FINC_S_CA_ID=response.data.result[0].FINC_S_CA_ID;
      $scope.FINC_S_CA_NAME=response.data.result[0].FINC_S_CA_NAME;
      $scope.FINC_S_CA_DESC=response.data.result[0].FINC_S_CA_DESC;
      $scope.FINC_S_CA_BATCH=response.data.result[0].FINC_S_CA_BATCH;
    });
  }
}]);