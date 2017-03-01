app.controller('schedulefeectrl', ['$scope', '$timeout','$http', 'toaster','$rootScope','$localStorage','$location','$ngBootbox','$mdDialog','$window',
  function($scope, $timeout, $http, toaster,$rootScope,$localStorage,$location,$ngBootbox,$mdDialog,$window) {
  $scope.isLoading=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.show_pagination=true;
  $scope.data='';
  $scope.status='';
  $scope.sampleData = [];
  $scope.rowCollection = [];
  $scope.Inc=[];
  $scope.categoryList=[];
   $scope.email = [];
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
    console.log();
    $scope.sampleData=[
    {id:'1',name:'mani',mail:'gnanamani894@gmail.com',catageory:'term1',mode:'amount',discount:'Y'},
    {id:'2',name:'arun',mail:'gnanamani@cloudlogic.in',catageory:'term2',mode:'amount',discount:'N'},
    {id:'3',name:'vijay',mail:'vijayaraj@appnlogic.com',catageory:'term3',mode:'amount',discount:'Y'}
    ];
    $scope.displayedCollection = [].concat($scope.sampleData);
    console.log($scope.displayedCollection);
     $scope.isLoading=false;
  $scope.deleteData = function(index) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=$scope.displayedCollection[index].id;
              $http({
                method : "DELETE",
                url : $rootScope.endUrl+"FinanceTxnModule/income",
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

  $scope.multiple_mail_send = function() {
    console.log($scope.displayedCollection,"$scope.displayedCollection")
    $scope.emp_id =[];
    var totalLength=$scope.displayedCollection.length;
    for(var i=0;i<totalLength;i++){
      if ($scope.post[i]==true) {
        var emp_id=$scope.displayedCollection[i].id;
          $scope.emp_id.push(emp_id);
        }
      }
      $http({
          method : "POST",
          url : 'http://localhost/smartedu/FeesCntrl/getmail_id',
          data : {'id':$scope.emp_id}
      })
      .then(function mySucces(response) {
        $scope.retun_data = response.data;
        $scope.mail_send($scope.retun_data);
      }, function myError(response) {
       
      });
    
  }
  $scope.mail_send = function(params) {
      $http({
        method : "POST",
        url : 'http://localhost/smartedu/FeesCntrl/Multiple_send_email',
        data : {'params':params}
      })
      .then(function mySucces(response) {
        console.log(response,'email response');
         bootbox.alert('<h4><center>Email Send Successfully<center></h4>');
      }, function myError(response) {
      });
}
 $scope.showAdvanced = function(ev,mode,data) {  
    console.log(mode =='Add');
    console.log(mode ,'modetype');
    console.log(data ,'datatype');
    if(mode == 'Add')
    {
      $rootScope.temp_incomedata = null;
    }else if(mode == 'Edit')
    {
      console.log(data , 'ccc');
      $rootScope.temp_incomedata = data;
    }
    $scope.Exp=data;
    
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tpl/Finance/schedulecollectionModal.html',
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

  function DialogController($scope, $mdDialog, $rootScope, $localStorage) {
    $scope.rowCollection = [];
     $scope.Inc=[];
    console.log($rootScope.temp_incomedata , 'aaaa');
    $scope.categoryList=[];
    $scope.buttonStatus='Save';
    $scope.access_token=$localStorage.access_token;
    if($rootScope.temp_incomedata == null)
    {
      $scope.Save=true;
      $scope.Edit=false;
      $scope.buttonStatus='Save';
     
      $scope.Inc = {
        FINC_TXN_IN_ID : null,
        FINC_TXN_IN_CA_ID : null,
        FINC_TXN_IN_TITLE : null,
        FINC_TXN_IN_DESC : null,
        FINC_TXN_IN_AMT :  null,
        FINC_TXN_IN_DT : null,
        FINC_TXN_IN_STATUS : 'N'
    }
    }else{
      console.log($rootScope.temp_incomedata ,'zzzz');
      $scope.Save=false;
      $scope.Edit=true;
      $scope.buttonStatus='Update';
      $scope.FINC_TXN_IN_ID = $rootScope.temp_incomedata.FINC_TXN_IN_ID;
      $scope.FINC_TXN_IN_TITLE = $rootScope.temp_incomedata.FINC_TXN_IN_TITLE;
      $scope.FINC_TXN_IN_DESC = $rootScope.temp_incomedata.FINC_TXN_IN_DESC;
      $scope.FINC_TXN_IN_DT = new Date($rootScope.temp_incomedata.FINC_TXN_IN_DT);
      $scope.FINC_TXN_IN_AMT = $rootScope.temp_incomedata.FINC_TXN_IN_AMT;
      $scope.FINC_TXN_IN_STATUS = $rootScope.temp_incomedata.FINC_TXN_IN_STATUS;
      $scope.FINC_TXN_IN_CA_ID = $rootScope.temp_incomedata.FINC_TXN_IN_CA_ID;

      console.log($scope.FINC_TXN_IN_DT,'date');
     /* $scope.Exp = $rootScope.temp_incomedata;*/
    }

    $http.get($rootScope.endUrl+'FinanceTxnModule/expense',{headers: {'access_token':$scope.access_token}}).success(function(incomingData) {
          $scope.rowCollection = incomingData.result;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false;

    // categoryList
    $http.get($rootScope.endUrl+'FinanceTxnModule/categoryList',{headers: {'access_token':$scope.access_token}}).success(function(response) {
          $scope.categoryList = response.result;
    });

    $scope.saveIncome=function(user_data,$index){
      $mdDialog.hide();

      $http({
        method : "POST",
        url : $rootScope.endUrl+"FinanceTxnModule/income",
        data : { 
          'FINC_TXN_IN_ID':$scope.Inc.FINC_TXN_IN_ID,'FINC_TXN_IN_CA_ID' : 'cat',
          'FINC_TXN_IN_TITLE' : $scope.Inc.FINC_TXN_IN_TITLE,'FINC_TXN_IN_DESC' : $scope.Inc.FINC_TXN_IN_DESC,
          'FINC_TXN_IN_AMT' : $scope.Inc.FINC_TXN_IN_AMT,'FINC_TXN_IN_DT' : $scope.Inc.FINC_TXN_IN_DT,
          'FINC_TXN_IN_STATUS' : $scope.Inc.FINC_TXN_IN_STATUS
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

  $scope.callbackbulk = function() {
     var totalLength=$scope.itemsByPage;
      for (var i = totalLength - 1; i >= 0; i--) {
          $scope.post[i]=$scope.selectall;
      };
      $scope.callbackfunction();
  }

  $scope.callbackfunction=function(){
    $scope.total_checkbox=[];
    var totalLength=$scope.displayedCollection.length;
      for(var i=0;i<totalLength;i++){
           if ($scope.post[i]==true) {
              var curr_id=$scope.displayedCollection[i].id;
              console.log('catid',curr_id);
              $scope.total_checkbox.push(curr_id);
           }
      }
      console.log($scope.total_checkbox,'total_checkbox');
      $localStorage.idList=$scope.total_checkbox;
  }
  $scope.multipleDelete = function(data,total_length,curr_length) {
    $http({
      method : "DELETE",
      url : $rootScope.endUrl+"FinanceTxnModule/income",
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
                      var cat_id=$scope.displayedCollection[i].FINC_TXN_IN_ID;
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
      $http.get($rootScope.endUrl+'FinanceTxnModule/income',{headers: {'access_token':$scope.access_token}}).success(function (response, status, headers, config) {
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
  $scope.editIncome=function(curr_id){
    $scope.buttonStatus='Update';
     $http({
      method : "GET",
      url : $rootScope.endUrl+'FinanceTxnModule/income',
      params :{id : curr_id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      $scope.Inc=response.data.result[0];
    });
  }


$scope.generatePDF = function() {
  $http({
    //url : 'http://localhost/smartedu/Payslip/pdf_generate',
    url : 'http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate',
    method : 'POST',
    data : { 'pdfId':$localStorage.idList},
    responseType : 'arraybuffer',
    headers: {
     'Content-type' : 'application/pdf'
    },
    cache: true,
   }).success(function(data) {
    var blob = new Blob([data], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(blob);
    //alert(fileURL)
    var fileName = "1099.pdf";
    var contentFile = blob;
    var a= document.createElement('a');
    a.href= fileURL; 
    a.target= '_blank';
    //a.download= 'yourfilename.pdf';
    document.body.appendChild(a);
    a.click();
   }).error(function(data){
    alert("error"+data);
   });

  // $http({
  //     method : "POST",
  //     url : 'http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate',
  //     data : { 'pdfId':$localStorage.idList},
  //     responsetype:'arraybuffer'
  //   }).then(function mySucces(response) {
  //     // window.open("http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate/", '_blank');
  //     var collection = $localStorage.idList;
  //       //for(var $i = 0; $i< collection.length; $i++){
  //         // var pdfWin= window.open("data:application/pdf;base64, " + response, '', 'height=650,width=840')
  //         var file = new Blob([response], {type: 'application/pdf'});
  //         var fileURL = URL.createObjectURL(file);
  //         $window.open(fileURL);
  //         // window.open("http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate/"+collection, '_blank');
  //      // }
  //       //$localStorage.idList='';
  //   });
}



  $scope.multiple_pdf = function() {
      console.log($scope.displayedCollection,"$scope.displayedCollection")
       $scope.emp_id = [];
      var totalLength=$scope.displayedCollection.length;
      for(var i=0;i<totalLength;i++){
           if ($scope.post[i]==true) {
              var pdf_id=$scope.displayedCollection[i].id;
              // $scope.emp_id.push(pdf_id);
              // console.log(pdf_id,'totalLengthtotalLengthtotalLength');
               $http({
                method : "POST",
                url : 'http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate',
                data : { 'pdfId':$scope.displayedCollection[i].id}
              }).then(function mySucces(response) {
                console.log(response,"response");
                 window.open("http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate", '_blank');
                /*for(var $i = 0; $i< contData; $i++){
                   window.open("http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate", '_blank');
                }*/
              });
           }
      }
      // $http({
      //   method : "POST",
      //   url : 'http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate',
      //   data : { 'pdfId':$scope.emp_id}
      // })
      // .then(function mySucces(response) {
      //   //console.log(response.config.data.pdfId,'pdf');
      //   // var contData = response.config.data.pdfId.length;
      //   //  console.log( contData,'totaaaallll');
      
      //   // for(var $i = 0; $i< contData; $i++){
      //   //   window.open("http://localhost/smartedu/FeesCntrl/defaulter_pdf_generate", '_blank');
      //   // }
         
      //    //$scope.pdf = response.data;
      //    //console.log($scope.email);
      //    //$scope.generatePdf($scope.pdf);
         

      // });
  }
}]);