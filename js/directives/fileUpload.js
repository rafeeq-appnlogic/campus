// angular.module('app').directive('fileUpload',['$parse',function($parse){
//       return {
//           restrict:'A',
//           link:function(scope, element ,attrs){
//               element.bind('change',function(){
//                   $parse(attrs.fileUpload).assign(scope, element[0].files[0].name)
//                   scope.$apply();
//               })
//           }
//       }
//   }]);

angular.module('app').directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };
    return {
        link: fn_link
    }
} ]);