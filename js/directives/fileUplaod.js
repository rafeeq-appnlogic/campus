angular.module('app').directive('fileUpload',['$parse',function($parse){
      return {
          restrict:'A',
          link:function(scope, element ,attrs){
              element.bind('change',function(){
                  $parse(attrs.fileUpload).assign(scope, element[0].files[0].name)
                  scope.$apply();
              })
          }
      }
  }]);