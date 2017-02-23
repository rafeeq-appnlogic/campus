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
} ])

.directive('dropZone',[
        function(){
            var config = {
                template:'<label class="drop-zone">'+
                         '<input type="file" accept="jpg" />'+
                         '<div ng-transclude></div>'+       // <= transcluded stuff
                         '</label>',
                transclude:true,
                replace: true,
                require: '?ngModel',
                link: function(scope, element, attributes, ngModel){
                    var upload = element[0].querySelector('input');    
                        upload.addEventListener('dragover', uploadDragOver, false);
                        upload.addEventListener('drop', uploadFileSelect, false);
                        upload.addEventListener('change', uploadFileSelect, false);                
                        config.scope = scope;                
                        config.model = ngModel; 
                }
            }
            return config;


            // Helper functions
            function uploadDragOver(e) { e.stopPropagation(); e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }
            function uploadFileSelect(e,scope) {
                console.log(this,'scope',scope);
                e.stopPropagation();
                e.preventDefault();
                var files = e.dataTransfer ? e.dataTransfer.files: e.target.files;
                for (var i = 0, file; file = files[i]; ++i) {
                    console.log(file);
                    var reader = new FileReader();
                    reader.onload = (function(file) {
                        return function(e) { 
                            var data={
                                data:e.target.result,
                                dataSize: e.target.result.length
                            };
                            // config.scope.imageDetails=file;
                            // console.log(config.scope.imageDetails);
                            config.scope.getTheFiles(data);
                            console.log(data);
                            config.scope.data=e.target.result;
                            for(var p in file){ data[p] = file[p] }                            
                            config.scope.$apply(function(){ config.model.$viewValue=data })
                        }
                    })(file);
                    reader.readAsDataURL(file);
                }
            }
        }
    ]);