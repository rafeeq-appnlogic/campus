app.controller('viewSubjectsctrl', ['$scope', '$timeout','$http', 'editableOptions', 'editableThemes','toaster','$localStorage','$location','$ngBootbox','$rootScope','$mdDialog',
  function($scope, $timeout, $http, editableOptions, editableThemes,toaster,$localStorage,$location,$ngBootbox,$rootScope,$mdDialog) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.noData=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.data='';
  $scope.status='';
  $scope.rowCollection = [];
  $scope.Subject = [];
  $scope.access_token=$localStorage.access_token;

  $scope.selectOptionVal=[
  {value:'Main', name: 'Main'},
  {value:'Elective', name: 'Elective'},
  ];
  $scope.selectSlitfunction = function(selectedData) {
    if (angular.isObject(selectedData)) {
      return selectedData.name;  
    }else{
      return selectedData;  
    }  
  }

  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
     var paramOne = $localStorage.ACA_COU_ID;
    var paramTwo = $localStorage.ACA_BAT_ID;
    console.log(paramOne);
    console.log(paramTwo);
    $http({
      method : "GET",
      // url : "http://192.168.1.136/smartedu/api/ManageBatchModule/SubjectDetail",
      url : $rootScope.endUrl+"ManageBatchModule/manageSubjectView",
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(resData) {
        console.log(resData);
        $scope.rowCollection = resData.data.message;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
    
  $scope.deleteData = function(row) {
      $ngBootbox.confirm('Are you sure you want to delete this record?')
        .then(function() {
              $scope.isLoading = true;
              var id=row.ACA_SUB_ID;
              $http({
                method : "DELETE",
                url : $rootScope.endUrl+"ManageBatchModule/SubjectDetail",
                params : {ACA_SUB_ID : id},
                headers: {'access_token':$scope.access_token}
              }).then(function mySucces(response) {
                 setTimeout(function(){
                    var stat="success";
                    var stat1="error";
                    var success="Subject Detail Deleted successfully";
                    var failed="Subject Detail Delete failed";
                    if(response.data.status==true){
                      $scope.showMessage(success,stat);
                    }else{
                      $scope.showMessage(failed,stat1);
                    }
                    $scope.getMasterJobs(tableState);
                    $scope.isLoading = false;
                  },1100);
                })

                 });
  }
  $scope.addNewSubject = function() {
    $scope.Save=true;
    $scope.Edit=false;
    $scope.subject=true;
    $scope.Savebutton=true;
    $scope.Updatebutton=false;
    $scope.Subject = {
      ACA_SUB_ID:null,
      ACA_SUB_NAME:null,
      ACA_SUB_CODE:null,
      ACA_SUB_ELECT_YN:null,
      ACA_SUB_COU_ID:null
    };
    //$scope.displayedCollection.push($scope.inserted);
  };

  $scope.showAdvanced = function(ev,mode,data) {
    console.log(mode == 'Add');
    if(mode == 'Add'){
      $rootScope.temp_subject = null;
    }else if(mode == 'Edit'){
      $rootScope.temp_subject = data;
    }
    $scope.Subject=data;
    $mdDialog.show({
     controller: DialogController,
      templateUrl: 'tpl/academics/subjectmodal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(mode,data) {
      //$scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      //$scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog, $localStorage, $rootScope) {
    console.log($rootScope ,'Root');
    $scope.access_token=$localStorage.access_token;
    $http.get($rootScope.endUrl+'ManageClassModule/ClassDetail',{headers: {'access_token':$scope.access_token}}).success(function(response){
      console.log(response.message[0].ACA_COU_NAME,'- test');
          $scope.rowCollectionCourse = response.message;
          console.log($scope.rowCollectionBatch);
    });

    if($rootScope.temp_subject == null){
      $scope.Save=true;
      $scope.Edit=false;
      $scope.subject=true;
      $scope.Savebutton=true;
      $scope.Updatebutton=false;
      $scope.Subject = {
        ACA_SUB_ID:null,
        ACA_SUB_NAME:null,
        ACA_SUB_CODE:null,
        ACA_SUB_ELECT_YN:null,
        ACA_SUB_COU_ID:null
      };
    }else{
        $scope.Save=false;
        $scope.Edit=true;
        $scope.subject=true;
        $scope.Savebutton=false;
        $scope.Updatebutton=true;
        $scope.Subject = $rootScope.temp_subject;
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


    $scope.saveSubject=function(){
      $mdDialog.hide();
    $scope.isLoading = true;
    // var paramOne = $localStorage.ACA_COU_ID;
    // var paramTwo = $localStorage.ACA_BAT_ID;
    //alert(JSON>stringify(user_data))
    setTimeout(function(){
       $http({
        method : "POST",
        url : $rootScope.endUrl+"ManageBatchModule/SubjectDetail",
        headers: {'access_token':$scope.access_token},
        data : {'ACA_SUB_COU_ID':$scope.Subject.ACA_SUB_COU_ID,'ACA_SUB_NAME' : $scope.Subject.ACA_SUB_NAME,'ACA_SUB_CODE' : $scope.Subject.ACA_SUB_CODE,'ACA_SUB_ELECT_YN' : $scope.Subject.ACA_SUB_ELECT_YN}
      }).then(function mySucces(response) {
          console.log(response.data.status);
           var stat="success";
          var stat1="error";
          var success="subject inserted Successfully";
          var failed="subject insert Failed";
          if(response.data.status==true){
            $scope.showMessage(success,stat);
            $scope.getMasterJobs(tableState);
          }else{
            $scope.showMessage(failed,stat1);
          }
      });/* function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });*/
      // setTimeout(function(){
      //   $scope.getMasterJobs(tableState);
      //   $scope.isLoading = false;
      // },500)      
    },200);
    
  }

  $scope.updateSubject=function(){
    $mdDialog.hide();
    $scope.isLoading = true;
    // var paramOne = $localStorage.ACA_COU_ID;
    // var paramTwo = $localStorage.ACA_BAT_ID;
    //alert(JSON>stringify(user_data))
    setTimeout(function(){
       $http({
        method : "POST",
        url : $rootScope.endUrl+"ManageBatchModule/SubjectDetail",
        data : {'ACA_SUB_ID':$scope.Subject.ACA_SUB_ID,'ACA_SUB_COU_ID':$scope.Subject.ACA_SUB_COU_ID,'ACA_SUB_NAME' : $scope.Subject.ACA_SUB_NAME,'ACA_SUB_CODE' : $scope.Subject.ACA_SUB_CODE,'ACA_SUB_ELECT_YN' : $scope.Subject.ACA_SUB_ELECT_YN},
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
          console.log(response.data.status);
           var stat="success";
          var stat1="error";
          var success="subject updated Successfully";
          var failed="subject updated Failed";
          if(response.data.status==true){
            $scope.showMessage(success,stat);
          }else{
            $scope.showMessage(failed,stat1);
          }
      });/* function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });*/
      setTimeout(function(){
        $scope.getMasterJobs(tableState);
        $scope.isLoading = false;
      },500)      
    },200);
    
  }

  $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=[];
      var paramOne = $localStorage.ACA_COU_ID;
      var paramTwo = $localStorage.ACA_BAT_ID;
       $http({
        method : "get",
        // url : "http://192.168.1.136/smartedu/api/ManageBatchModule/SubjectDetail",
        url : $rootScope.endUrl+"ManageBatchModule/manageSubjectView",
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
          $scope.rowCollection = response.data.message;
          console.log(response.data.message , 'XXXXX');
          $scope.displayedCollection = [].concat(response.data.message);
          $scope.isLoading = false;
      })/*.error(function (data, status, headers, config) {
          $scope.isLoading = false;
      });*/
  };

  $scope.removeRow = function(curr_id,index) {
    $scope.getMasterJobs(tableState);
  }
  $scope.showMessage=function(data,status){
    toaster.pop(status, data);
  }

  }


   $scope.GetValue = function(user){
     // console.log(user.ACA_BAT_COU_ID);
      $scope.getData = user.ACA_COU_ID;
      var id = $scope.getData;
      //alert(JSON.stringify(user))
      console.log(JSON.stringify(user),"id");
    }

$http.get($rootScope.endUrl+'ManageClassModule/ClassDetail',{headers: {'access_token':$scope.access_token}}).success(function(response){
      console.log(response.message[0].ACA_COU_NAME,'- test');
          $scope.rowCollectionBatch = response.message;
          console.log($scope.rowCollectionBatch);
    });

$scope.saveSubject=function(){
    $scope.isLoading = true;
    // var paramOne = $localStorage.ACA_COU_ID;
    // var paramTwo = $localStorage.ACA_BAT_ID;
    //alert(JSON>stringify(user_data))
    setTimeout(function(){
       $http({
        method : "POST",
        url : $rootScope.endUrl+"ManageBatchModule/SubjectDetail",
        data : {'ACA_SUB_COU_ID':$scope.getData,'ACA_SUB_NAME' : $scope.Subject.ACA_SUB_NAME,'ACA_SUB_CODE' : $scope.Subject.ACA_SUB_CODE,'ACA_SUB_ELECT_YN' : $scope.Subject.ACA_SUB_ELECT_YN}
      }).then(function mySucces(response) {
          console.log(response.data.status);
           var stat="success";
          var stat1="error";
          var success="subject inserted Successfully";
          var failed="subject insert Failed";
          if(response.data.status==true){
            $scope.showMessage(success,stat);
          }else{
            $scope.showMessage(failed,stat1);
          }
      });/* function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });*/
      setTimeout(function(){
        $scope.getMasterJobs(tableState);
        $scope.isLoading = false;
      },500)      
    },200);
    
  }

  $scope.EditSubject=function(id){
    // $scope.testForm=true;
    $scope.Save=false;
    $scope.Edit=true;
    $scope.subject=false;
    $scope.Savebutton=false;
    $scope.Updatebutton=true;
    var id=id.ACA_SUB_ID;
    // alert(user_id);
    $http({
      method : "GET",
      url : $rootScope.endUrl+'ManageBatchModule/SubjectDetail',
      params :{ACA_SUB_ID : id},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
      console.log(response,'test');
      $scope.Subject=[];
      $scope.Subject=response.data.message[0];
    },function myError(response) {
    });
  };
  $scope.updateSubject=function(){
    $scope.isLoading = true;
    // var paramOne = $localStorage.ACA_COU_ID;
    // var paramTwo = $localStorage.ACA_BAT_ID;
    //alert(JSON>stringify(user_data))
    setTimeout(function(){
       $http({
        method : "POST",
        url : $rootScope.endUrl+"ManageBatchModule/SubjectDetail",
        data : {'ACA_SUB_ID':$scope.Subject.ACA_SUB_ID,'ACA_SUB_COU_ID':$scope.getData,'ACA_SUB_NAME' : $scope.Subject.ACA_SUB_NAME,'ACA_SUB_CODE' : $scope.Subject.ACA_SUB_CODE,'ACA_SUB_ELECT_YN' : $scope.Subject.ACA_SUB_ELECT_YN},
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
          console.log(response.data.status);
           var stat="success";
          var stat1="error";
          var success="subject updated Successfully";
          var failed="subject updated Failed";
          if(response.data.status==true){
            $scope.showMessage(success,stat);
          }else{
            $scope.showMessage(failed,stat1);
          }
      });/* function myError(response) {
        $scope.showMessage(response.data.message,'error'); 
      });*/
      setTimeout(function(){
        $scope.getMasterJobs(tableState);
        $scope.isLoading = false;
      },500)      
    },200);
    
  }
 /* $scope.saveSubject=function(user_data,$index){
    var paramOne = $localStorage.ACA_COU_ID;
    var paramTwo = $localStorage.ACA_BAT_ID;
    //console.log(user_data);
    setTimeout(function(){
      $http({
        method : "POST",
        url : "http://192.168.1.136/smartedu/api/ManageBatchModule/SubjectDetail",
        data : { 'ACA_SUB_ID':user_data.ACA_SUB_ID,'ACA_SUB_COU_ID':paramOne,'ACA_SUB_BAT_ID':paramTwo,'ACA_SUB_NAME' : user_data.ACA_SUB_NAME,'ACA_SUB_CODE' : user_data.ACA_SUB_CODE,'ACA_SUB_MAXCLASS_WEEK' : user_data.ACA_SUB_MAXCLASS_WEEK}
      }).then(function mySucces(response) {
        console.log(response.data.status);
        //$scope.status=response.data.status;
        $scope.displayedCollection[$index].ACA_SUB_ID=response.data.ACA_SUB_ID
        var stat="success";
        var stat1="error";
        var success="subject inserted Successfully";
        var failed="subject insert Failed";
        if(response.data.status==true){
          $scope.showMessage(success,stat);
        }else{
          $scope.showMessage(failed,stat1);
        }
      }, function myError(response) {

      });
      $scope.getMasterJobs(tableState);
    },200);

  }*/
  $scope.removeRow = function(curr_id,index) {
    $scope.getMasterJobs(tableState);
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
      url : $rootScope.endUrl+"ManageBatchModule/SubjectDetail",
      params : {ACA_SUB_ID : data},
      headers: {'access_token':$scope.access_token}
    }).then(function mySucces(response) {
    }, function myError(response) {
    });
  }
   $scope.applyAction = function() {
     if($scope.bulkaction==1){
    $ngBootbox.confirm('Are you sure you want to delete all this record ?')
        .then(function() {
          // if($scope.bulkaction==1 && $scope.post.length > 0){
          //   var totalLength=$scope.post.length;
          //   for (var i = totalLength - 1; i >= 0; i--) {
          //     if ($scope.post[i]==true) {
          //       $scope.post[i]=false;
          //       $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID);
          //       // $scope.displayedCollection.splice(i, 1);
          //     };
          //   };
          //   $scope.showMessage("Record Deleted Successfully","success");
          //   setTimeout(function(){
          //     console.log('timeDelay');
          //     $scope.getMasterJobs(tableState);
          //   },700);
          // }
          // if($scope.selectall==1 && $scope.post.length > 0){
          //   var totalLength=$scope.itemsByPage;
          //   for (var i = totalLength - 1; i >= 0; i--) {
          //        $scope.multipleDelete($scope.displayedCollection[i].EMP_C_ID);
          //       // $scope.displayedCollection.splice(i, 1);
          //   };
          //   $scope.selectall=false;
          //   $scope.showMessage("Records Deleted Successfully","success");
          //   setTimeout(function(){
          //     console.log('timeDelay');
          //     $scope.getMasterJobs(tableState);
          //   },700);
          // }

          if($scope.bulkaction==1){
            if($scope.selectall==true || $scope.post.length > 0){
              var totalLength=$scope.displayedCollection.length;
              console.log(totalLength,'totalLengthtotalLengthtotalLength');
              for(var i=0;i<totalLength;i++){
                // if(typeof $scope.displayedCollection[i]!='undefined'){
                   if ($scope.post[i]==true) {
                      // $scope.post[i]=false;
                      var cat_id=$scope.displayedCollection[i].ACA_SUB_ID;
                      $scope.multipleDelete(cat_id);
                   }
                // }
              }
            }
                // console.log($scope.post,'$scope.post$scope.post');
                // if ($scope.post[i]==true) {
                //   if($scope.displayedCollection[i]!='undefined'){
                //     $scope.post[i]=false;
                //     var cat_id=$scope.displayedCollection[i].EMP_C_ID;
                //     $scope.multipleDelete(cat_id);
                //   }else {

                //   }
                  // $scope.post[i]=false;
                  // console.log($scope.displayedCollection,'$scope.displayedCollection[i]');
                  // var cat_id=$scope.displayedCollection[i].EMP_C_ID;
                  // // $scope.displayedCollection.splice(i, 1);
                  // // console.log(cat_id,'cat_idcat_id');
                  // $scope.multipleDelete(cat_id);
            //     };
            //   };
            // }
             $scope.selectall=false;
             $scope.showMessage("Records Deleted Successfully","success");
             setTimeout(function(){
                $scope.callbackbulk();
                $scope.getMasterJobs(tableState);
             },700);
          }
        });
      }
  }


 $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $scope.rowCollection=[];
      var paramOne = $localStorage.ACA_COU_ID;
      var paramTwo = $localStorage.ACA_BAT_ID;
       $http({
        method : "get",
        // url : "http://192.168.1.136/smartedu/api/ManageBatchModule/SubjectDetail",
        url : $rootScope.endUrl+"ManageBatchModule/manageSubjectView",
        headers: {'access_token':$scope.access_token}
      }).then(function mySucces(response) {
          $scope.rowCollection = response.data.message;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.isLoading = false;
      })/*.error(function (data, status, headers, config) {
          $scope.isLoading = false;
      });*/
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
}]);