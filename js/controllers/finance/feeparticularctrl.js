app.controller('feeparticularctrl', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox','$mdDialog',
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
  $scope.FeesCat=[];
  $scope.BatchList=[];
// url refresh
  if($localStorage.user_id==''){
    $location.path('signin');
  }else {
    $location.path($location.url());      
  }

  // $scope.studentcat=[];
  $scope.studentcat=[
  {id:'1',desc:'Test'},
  {id:'2',desc:'Data'},
  {id:'3',desc:'Demo'}
  ];
$scope.access_token=$localStorage.access_token;
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get($rootScope.endUrl+'FinanceFeesModule/particular',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
          $scope.rowCollection = incomingData.result;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;

    // Get fees category Details
    $http.get($rootScope.endUrl+'FinanceFeesModule/getFeesCategoryList',{headers: {'access_token':$scope.access_token}}).success(function(response){
          $scope.FeesCat = response.message;
    });


  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].FINC_S_PA_ID;
              $http({
                method : "DELETE",
                url : $rootScope.endUrl+"FinanceFeesModule/particular",
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
    $scope.FINC_S_PA_ID= null;
    $scope.FINC_S_PA_CA_ID=null;
    $scope.FINC_S_PA_NAME= null;
    $scope.FINC_S_PA_DESC= null;
    $scope.FINC_S_PA_CREATE_TYPE= 'all';
    $scope.FINC_S_PA_AMT=null;
    $scope.FINC_S_PA_STU_CATE= null;
    $scope.FINC_S_PA_ADM_NO= null;
    $scope.FINC_S_PA_BATCH= null;
  };*/

  $scope.showAdvanced = function(ev,mode,data) {
    
    console.log(mode =='Add');
    console.log(mode ,'modetype');
    console.log(data ,'datatype');
    if(mode == 'Add')
    {
      $rootScope.temp_particdata = null;
    }else if(mode == 'Edit')
    {
      console.log(data , 'ccc');
      $rootScope.temp_particdata = data;
    }
   
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tpl/finance_module/feeparticularModal.html',
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
     $scope.partic=[];
    console.log($rootScope.temp_particdata , 'aaaa');
    $scope.categoryList=[];
     $scope.studentcat=[];
     $scope.studentcat=[
    {id:'1',desc:'Test'},
    {id:'2',desc:'Data'},
    {id:'3',desc:'Demo'}
    ];
    $scope.buttonStatus='Save';
    $scope.access_token=$localStorage.access_token;
    if($rootScope.temp_particdata == null)
    {
      $scope.Save=true;
      $scope.Edit=false;
      $scope.buttonStatus='Save';
      $scope.partic = {
        FINC_S_PA_ID : null,
        FINC_S_PA_CA_ID : null,
        FINC_S_PA_NAME : null,
        FINC_S_PA_DESC : null,
        FINC_S_PA_CREATE_TYPE : 'all',
        FINC_S_PA_AMT : null,
        FINC_S_PA_STU_CATE : null,
        FINC_S_PA_ADM_NO : null,
        FINC_S_PA_BATCH : null
    }
    }else{
      console.log($rootScope.temp_particdata ,'zzzz');
      $scope.Save=false;
      $scope.Edit=true;
      $scope.buttonStatus='Update';
      $scope.FINC_S_PA_ID = $rootScope.temp_particdata.FINC_S_PA_ID;
      $scope.FINC_S_PA_NAME = $rootScope.temp_particdata.FINC_S_PA_NAME;
      $scope.FINC_S_PA_DESC = $rootScope.temp_particdata.FINC_S_PA_DESC;
      $scope.FINC_S_PA_CREATE_TYPE = $rootScope.temp_particdata.FINC_S_PA_CREATE_TYPE;
      $scope.FINC_S_PA_STU_CATE = $rootScope.temp_particdata.FINC_S_PA_STU_CATE;
      $scope.FINC_S_PA_AMT = $rootScope.temp_particdata.FINC_S_PA_AMT;
      $scope.FINC_S_PA_ADM_NO = $rootScope.temp_particdata.FINC_S_PA_ADM_NO;
      $scope.FINC_S_PA_CA_ID = $rootScope.temp_particdata.FINC_S_PA_CA_ID;
      /*$scope.getBatchList($scope.FINC_S_PA_CA_ID);*/
      $http({
        method : "GET",
        url : $rootScope.endUrl+'FinanceFeesModule/getParticularBatch',
        params :{id : $scope.FINC_S_PA_CA_ID},
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
        $scope.BatchList = response.data.message;
        $scope.FINC_S_PA_BATCH = $rootScope.temp_particdata.FINC_S_PA_BATCH;
        console.log($scope.BatchList,'batch');
      });
      /* $scope.FINC_S_PA_BATCH = $rootScope.temp_particdata.FINC_S_PA_BATCH;*/

      console.log($scope.FINC_S_PA_BATCH,'batch');
     /* $scope.Exp = $rootScope.temp_particdata;*/
    }

    $http.get($rootScope.endUrl+'FinanceFeesModule/particular',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
          $scope.rowCollection = incomingData.result;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;

    // Get fees category Details
    $http.get($rootScope.endUrl+'FinanceFeesModule/getFeesCategoryList',{headers: {'access_token':$scope.access_token}}).success(function(response){
          $scope.FeesCat = response.message;
    });

   $scope.saveParticular=function($index){
      $mdDialog.hide();
      $http({
        method : "POST",
        url : $rootScope.endUrl+"FinanceFeesModule/particular",
        data : { 
          'FINC_S_PA_ID':$scope.FINC_S_PA_ID,'FINC_S_PA_CA_ID' : $scope.FINC_S_PA_CA_ID,
          'FINC_S_PA_NAME' : $scope.FINC_S_PA_NAME,'FINC_S_PA_DESC' : $scope.FINC_S_PA_DESC,
          'FINC_S_PA_CREATE_TYPE' : $scope.FINC_S_PA_CREATE_TYPE,'FINC_S_PA_AMT' : $scope.FINC_S_PA_AMT,
          'FINC_S_PA_STU_CATE' : $scope.FINC_S_PA_STU_CATE,'FINC_S_PA_ADM_NO' : $scope.FINC_S_PA_ADM_NO,
          'FINC_S_PA_BATCH' : $scope.FINC_S_PA_BATCH
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
      $http.get($rootScope.endUrl+'FinanceFeesModule/particular',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
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

    $scope.getBatchList=function(){
      var category_id=$scope.FINC_S_PA_CA_ID;
      $http({
        method : "GET",
        url : $rootScope.endUrl+'FinanceFeesModule/getParticularBatch',
        params :{id : category_id},
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
        $scope.BatchList = response.data.message;
        console.log($scope.BatchList,'batch');
      });
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
      url : $rootScope.endUrl+"FinanceFeesModule/particular",
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
                      var cat_id=$scope.displayedCollection[i].FINC_S_PA_ID;
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
      $http.get($rootScope.endUrl+'FinanceFeesModule/particular',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
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
  $scope.editParticular=function(curr_id){
    $scope.buttonStatus='Update';
     $http({
      method : "GET",
      url : $rootScope.endUrl+'FinanceFeesModule/particular',
      params :{id : curr_id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      console.log(response.data.result[0],'responseEdit');
      $scope.FINC_S_PA_ID=response.data.result[0].FINC_S_PA_ID;
      $scope.FINC_S_PA_CA_ID=response.data.result[0].FINC_S_PA_CA_ID;
      $scope.FINC_S_PA_NAME=response.data.result[0].FINC_S_PA_NAME;
      $scope.FINC_S_PA_DESC=response.data.result[0].FINC_S_PA_DESC;
      $scope.FINC_S_PA_CREATE_TYPE=response.data.result[0].FINC_S_PA_CREATE_TYPE;
      $scope.FINC_S_PA_AMT=response.data.result[0].FINC_S_PA_AMT;
      $scope.FINC_S_PA_STU_CATE=response.data.result[0].FINC_S_PA_STU_CATE;
      $scope.FINC_S_PA_ADM_NO=response.data.result[0].FINC_S_PA_ADM_NO;
      $scope.FINC_S_PA_BATCH=response.data.result[0].FINC_S_PA_BATCH;
    });
  }

 /* $scope.getBatchList=function(){
    alert();
    var category_id=$scope.FINC_S_PA_CA_ID;
    $http({
      method : "GET",
      url : $rootScope.endUrl+'FinanceFeesModule/getParticularBatch',
      params :{id : category_id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      $scope.BatchList = response.data.message;
      console.log($scope.BatchList,'batch');
    });
  }*/
}]);