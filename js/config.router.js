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
                  templateUrl: "tpl/hrconfig/employee_category.html",
                  resolve: load(['js/controllers/hrconfig.js'])
              })
              .state("app.Employee-Department", {
                  url: "/employee-dept",
                  templateUrl: "tpl/hrconfig/employee_department.html",
                  resolve: load(['js/controllers/hrconfig.js'])
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
              }).state("app.Payroll-CategoryView", {
                  url: "/Payroll-CategoryView",
                  templateUrl: "tpl/payroll/payroll_category_view.html"
              }).state("app.pr-group", {
                  url: "/pr-group",
                  templateUrl: "tpl/payroll/payroll_group_view.html"
              }).state("app.pr-groupcreate", {
                  url: "/pr-groupcreate",
                  templateUrl: "tpl/payroll/payroll_group_create.html"
              }).state("app.pr-groupview", {
                  url: "/pr-groupview",
                  templateUrl: "tpl/payroll/payroll_group_viewNew.html"
              }).state("app.pr-assigngroup", {
                  url: "/pr-assigngroup",
                  templateUrl: "tpl/payroll/payroll_assign_group.html"
              }).state("app.pr-changegroup", {
                  url: "/pr-changegroup",
                  templateUrl: "tpl/payroll/payroll_change_group_view.html"
              }).state("app.pr-changegroupedit", {
                  url: "/pr-changegroupedit",
                  templateUrl: "tpl/payroll/payroll_change_group.html"
              }).state("app.pr-groupedit", {
                  url: "/pr-groupedit",
                  templateUrl: "tpl/payroll/payroll_group_Edit.html"
              }).state("app.pr-groupemployee", {
                  url: "/pr-groupemployee",
                  templateUrl: "tpl/payroll/payroll_group_employee.html"
              }).state("app.pr-groupassignemployee", {
                   url: "/pr-groupassignemployee",
                   templateUrl: "tpl/payroll/payroll_group_assign.html"
              }).state("app.ps-viewpayslip", {
                   url: "/viewpayslip",
                   templateUrl: "tpl/payroll/payslip_viewpayslip.html"
              }).state("app.ps-viewpayslipall", {
                   url: "/viewpayslipall",
                   templateUrl: "tpl/payroll/payslip_viewpayslipall.html"
              })

                  .state("app.Emppayslip-Report", {
                  url: "/emppayslip-report",
                  templateUrl: "tpl/payroll/EmpPayslipReport.html"
              })
                 .state("app.Payslipview-Report", {
                  url: "/payslipview-report",
                  templateUrl: "tpl/payroll/EmpPayslipReportView.html"
              })
              .state("app.PayslipFor-Employee", {
                  url: "/payslipfor-employee",
                  templateUrl: "tpl/payroll/PayslipForEmployee.html"
              })
              .state("app.Generate-Payslip", {
                  url: "/generate-payslip",
                  templateUrl: "tpl/payroll/GeneratePayslip.html"
              })
              .state("app.View-Payslip", {
                  url: "/view-payslip",
                  templateUrl: "tpl/payroll/ViewPayslip.html"
              })
              .state("app.Payslip-View", {
                  url: "/payslip-view",
                  templateUrl: "tpl/payroll/PayslipView.html"
                })
              .state("app.PayslipFor-PayrollGroup", {
                  url: "/payslipfor-payrollgroup",
                  templateUrl: "tpl/payroll/PayslipforPayrollGroup.html"
                })

              .state("app.GeneratePayslip-PayrollGroup", {
                  url: "/generatepayslip-payrollgroup",
                  templateUrl: "tpl/payroll/GeneratePayslipPayrollGroup.html"
                })
              .state("app.ViewPayslip-PayrollGroup", {
                  url: "/viewpayslip-payrollgroup",
                  templateUrl: "tpl/payroll/ViewPayslipPayrollGroup.html"
                })
                .state("app.Generate-PayslipforAll", {
                  url: "generate-payslipforall",
                  templateUrl: "tpl/payroll/GeneratePayslipforAll.html"
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
              //added by senthil for finance module
              .state("app.fn-assetview", {
                  url: "/assetview",
                  templateUrl: "tpl/Finance/assetview.html"
              })
                // added by vijayaraj
              .state("app.Bank-Details", {
                    url: "/bank-details",
                    templateUrl: "tpl/hrconfig/bank_details.html"
                }).state("app.Additional-Details", {
                    url: "/additional-details",
                    templateUrl: "tpl/hrconfig/additional_Details.html"
                }).state("app.Working-Days", {
                    url: "/working-days",
                    templateUrl: "tpl/hrconfig/workind_days.html"
                }).state("app.Leave-Types", {
                    url: "/leave-types",
                    templateUrl: "tpl/hrconfig/leave-types.html"
                }).state("app.Leavetype-Add", {
                    url: "/leavetype-add",
                    templateUrl: "tpl/hrconfig/leave-type-add.html"
                })          
                .state("app.Employee-Admission", {
                  url: "/employee-admission",
                  templateUrl: "tpl/employee_management/employee-admission.html",
                })
                .state("app.Employee-Sub-Association", {
                  url: "/employee-sub-association",
                  templateUrl: "tpl/employee_management/employee-sub_assoc.html",
                  resolve: load(['js/controllers/hrconfig.js'])
                })
                .state("app.Add-Expense", {
                  url: "/add-expense",
                  templateUrl: "tpl/Finance/addExpense.html",
              })
               .state("app.Add-Income", {
                url: "/add-income",
                templateUrl: "tpl/Finance/addIncome.html",
              })
               .state("app.Reverted-Transaction", {
                url: "/reverted-transaction",
                templateUrl: "tpl/Finance/revertedTransaction.html",
              })
               .state("app.Add-Advanced", {
                url: "/add-advanced",
                templateUrl: "tpl/Finance/advTransaction.html",
              })
               .state("app.Finance-Category", {
                url: "/finance-category",
                templateUrl: "tpl/Finance/financeCategory.html",
              })
               .state("app.Add-Donation", {
                url: "/add-donation",
                templateUrl: "tpl/Finance/addDonation.html",
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
