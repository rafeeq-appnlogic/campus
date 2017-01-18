'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "tpl/app.html";
          if(window.location.href.indexOf("material") > 0){
            layout = "tpl/blocks/material.layout.html";
            $urlRouterProvider
              .otherwise('/app/dashboard-v3');
          }else{
            $urlRouterProvider
              .otherwise('/app/dashboard-v1');
          }
          
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: layout
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: load(['js/controllers/chart.js'])
              })
              // added by rafeeq
              .state("app.Employee-Category", {
                  url: "/employee-category",
                  templateUrl: "tpl/hrconfig/employee_category.html"
                  // resolve: e(["js/app/todo/todo.js", "moment"])
              })
              .state("app.Employee-Department", {
                  url: "/employee-dept",
                  templateUrl: "tpl/hrconfig/employee_department.html"
              })
              .state("app.Employee-Position", {
                  url: "/employee-position",
                  templateUrl: "tpl/hrconfig/employee_position.html"
              })
              .state("app.Employee-Grade", {
                  url: "/employee-grade",
                  templateUrl: "tpl/hrconfig/employee_grade.html"
              })
              .state("app.pr-category", {
                  url: "/pr-category",
                  templateUrl: "tpl/payroll/payroll_category.html"
              })
              .state("app.pr-add", {
                  url: "/pr-add",
                  templateUrl: "tpl/payroll/Create_Payroll_Category.html"
              }).state("app.pr-group", {
                  url: "/pr-group",
                  templateUrl: "tpl/ui_icons.html"
              })
              .state("app.Payroll-CategoryView", {
                  url: "/Payroll-CategoryView",
                  templateUrl: "tpl/payroll/payroll_category_view.html"
              })
              .state("app.Attendance-Register", {
                  url: "/attendance-register",
                  templateUrl: "tpl/EmployeeLeaveMangement/AttendanceRegister.html"
              })
              .state("app.Attendance-Report", {
                  url: "/attendance-report",
                  templateUrl: "tpl/EmployeeLeaveMangement/AttendanceReport.html"
              })
              .state("app.Leave-Application", {
                  url: "/leave-application",
                  templateUrl: "tpl/EmployeeLeaveMangement/LeaveApplication.html"
              })
              .state("app.Leave-Reset", {
                  url: "/leave-reset",
                  templateUrl: "tpl/EmployeeLeaveMangement/LeaveReset.html"
              })
              .state("app.Reset-Leaves", {
                  url: "/reset-leaves",
                  templateUrl: "tpl/EmployeeLeaveMangement/ResetLeaves.html"
              })
              .state("app.Reset-Settings", {
                  url: "/reset-settings",
                  templateUrl: "tpl/EmployeeLeaveMangement/ResetSettings.html"
              })
              .state("app.ResetLeave-allEmp", {
                  url: "/resetLeave-allEmployee",
                  templateUrl: "tpl/EmployeeLeaveMangement/ResetEmployeeLeave.html"
              })
              ;

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );
