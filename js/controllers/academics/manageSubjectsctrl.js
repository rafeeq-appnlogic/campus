app.controller('manageSubjectsctrl', ['$scope','$localStorage', '$timeout','$http','$location','editableOptions', 'editableThemes','toaster', 
  function($scope,$localStorage, $timeout, $http,$location, editableOptions, editableThemes,toaster) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
  $scope.isLoading=true;
  $scope.bulkaction="0";
  $scope.selectall=false;
  $scope.post=[];
  $scope.itemsByPage=5;
  $scope.deletedItem=[];
  $scope.data='';
  $scope.status='';
  $scope.rowCollection = [];
  var tableState = {
        sort: {},
        search: {},
        pagination: {
            start: 0
        }
    };
    $http.get('http://192.168.1.136/smartedu/api/ManageClassModule/ClassAndBatchDetail').success(function(incomingData) {
      
          $scope.rowCollection = incomingData.message;
    });
    $scope.displayedCollection = [].concat($scope.rowCollection);
    $scope.isLoading=false
    $scope.viewSubject = function(res) {
    
      //console.log(res.ACA_BAT_ID,res.ACA_COU_ID);
       $localStorage.ACA_COU_ID=res.ACA_COU_ID;
       $localStorage.ACA_BAT_ID=res.ACA_BAT_ID;
       $location.path('/app/view-subjects/');
    }

    $scope.callbackbulk = function() {
       var totalLength=$scope.itemsByPage;
        for (var i = totalLength - 1; i >= 0; i--) {
            $scope.post[i]=$scope.selectall;
        };
    }
   

  $scope.getMasterJobs = function (tableState) {
      var start = 0;
      var length = 10;
      var pagination = tableState.pagination;
      start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      length = pagination.number || 10;  // Number of entries showed per page.
      $scope.isLoading = true;
      $http.get('http://localhost/smartedu/api/HrConfigModule/employeeCategory').success(function (response, status, headers, config) {
          $scope.rowCollection = response.aaData;
          $scope.displayedCollection = [].concat($scope.rowCollection);

          //set the number of pages so the pagination can update
          // tableState.pagination.numberOfPages = response.numberOfPages;
          // $scope.displayedPages = Math.ceil(response.numberOfPages / length);
          $scope.isLoading = false;
      }).error(function (data, status, headers, config) {
          console.error(data);
          $scope.isLoading = false;
      });
  };
}]);