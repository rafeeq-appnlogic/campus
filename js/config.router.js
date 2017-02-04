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
            alert();
            layout = "tpl/blocks/material.layout.html";
            $urlRouterProvider
              .otherwise('/app/dashboard-v3');
          }else{
            $urlRouterProvider
              .otherwise('signin');
          }
          
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: layout
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  cache:false,
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  controller:"AppCtrl",
                  resolve: load(['js/controllers/chart.js'])
              })
              // added by rafeeq
              .state("app.Employee-Category", {
                  url: "/employee-category",
                  controller:"empcategoryctrl",
                  templateUrl: "tpl/hrconfig/employee_category.html",
                  resolve: load(['smart-table','js/controllers/hrconfig/empcategoryctrl.js','xeditable','ui.bootstrap','toaster','ngBootbox'])
              })
              .state("app.Employee-Department", {
                  url: "/employee-dept",
                  templateUrl: "tpl/hrconfig/employee_department.html",
                  controller:"empdept_ctrl",
                  resolve: load(['smart-table','js/controllers/hrconfig/emp_deptctrl.js','xeditable'])
              })
              .state("app.Employee-Position", {
                  url: "/employee-position",
                  templateUrl: "tpl/hrconfig/employee_position.html",
                  controller:"position_ctrl",
                  resolve: load(['smart-table','js/controllers/hrconfig/position_ctrl.js','xeditable'])
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
                  controller:"assetctrl",
                  templateUrl: "tpl/Finance/assetview.html",
                  resolve: load(['smart-table','js/controllers/finance/asset.js','xeditable','ui.bootstrap'])
              })
              .state("app.fn-liabilityview", {
                  url: "/liabilityview",
                  controller:"liabilityctrl",
                  templateUrl: "tpl/Finance/liabilityview.html",
                  resolve: load(['smart-table','js/controllers/finance/liability.js','xeditable','ui.bootstrap'])
              })
              .state("app.fn-category", {
                  url: "/configcategory",
                  controller:"feecategoryctrl",
                  templateUrl: "tpl/Finance/feecategoryview.html",
                  resolve: load(['smart-table','js/controllers/finance/feecategoryctrl.js','toaster','ngBootbox'])
              })
              .state("app.fn-particularview", { 
                  url: "/particularview",
                  controller:"feeparticularctrl",
                  templateUrl: "tpl/Finance/particularview.html",
                  resolve: load(['smart-table','js/controllers/finance/feeparticularctrl.js','toaster','ngBootbox'])
              })
               .state("app.fee-discount", { 
                  url: "/discountview",
                  controller:"feediscountctrl",
                  templateUrl: "tpl/Finance/feeDiscount.html",
                  resolve: load(['smart-table','js/controllers/finance/feediscountctrl.js','toaster','ngBootbox'])
              })
               .state("app.add-fine", { 
                  url: "/fineview",
                  controller:"finectrl",
                  templateUrl: "tpl/Finance/addFine.html",
                  resolve: load(['smart-table','js/controllers/finance/finectrl.js','toaster','ngBootbox'])
              })
               .state("app.fee-schedule", { 
                  url: "/schedulefee",
                  controller:"schedulefeectrl",
                  templateUrl: "tpl/Finance/schedulefee.html",
                  resolve: load(['smart-table','js/controllers/finance/schedulefeectrl.js','toaster','ngBootbox'])
              })
                // added by vijayaraj
              .state("app.Bank-Details", {
                    url: "/bank-details",
                    templateUrl: "tpl/hrconfig/bank_details.html",
                    controller:"bank_detailsctrl",
                    resolve: load(['smart-table','js/controllers/hrconfig/bank_detailsctrl.js','xeditable'])
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
                  controller:"employeeMgmnt",
                  templateUrl: "tpl/employee_management/employee-admission.html",
                  resolve: load(['js/controllers/employeeMgmnt/employeeMgmnt.js','toaster','ngBootbox'])
                })
                .state("app.Employee-Details", {
                  url: "/employee-details",
                  controller:"empadmission_view",
                  templateUrl: "tpl/employee_management/employee-details.html",
                  resolve: load(['js/controllers/employeeMgmnt/empadm_view.js','toaster','ngBootbox','smart-table','xeditable','ui.bootstrap'])
                })
                .state("app.employee-view-profile", {
                  url: "/employee-view-profile",
                  controller:"employee_Profile",
                  templateUrl: "tpl/employee_management/employeeViewProfile.html",
                  resolve: load(['js/controllers/employeeMgmnt/empprofileCtrl.js','toaster','ngBootbox'])
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
              .state("app.Student_Details", {
                url: "/student-details",
                controller:"stuViewCtrl",
                templateUrl: "tpl/Student/student_details.html",
                resolve: load(['smart-table','js/controllers/studentconfig/stuViewCtrl.js','xeditable','ui.bootstrap','toaster','ngBootbox'])
              })
                .state("app.Advanced-Search", {
                url: "/advanced-search",
                templateUrl: "tpl/Student/advanced_search.html",
              })
                .state("app.View-Details", {
                url: "/view-details",
                templateUrl: "tpl/Student/view_details.html",
              })
              .state("app.viewStudDetails", {
                url: "/viewStudDetails",
                controller:"stuProfileCtr",
                templateUrl: "tpl/Student/view_detailsnew.html",
                resolve: load(['js/controllers/studentconfig/stuProfileCtr.js'])
              })
              .state("app.Student-Admission", {
                url: "/student-admission",
                controller:"stuAdmissionCtrl",
                templateUrl: "tpl/Student/student_admission.html",
                resolve: load(['js/controllers/studentconfig/stuAdmissionCtrl.js','toaster','ngBootbox'])
              })
                .state("app.Managestudent-Category", {
                url: "/managestudent-category",
                controller:"managestud_catctrl",
                templateUrl: "tpl/Student/manageStudent_category.html",
                resolve: load(['smart-table','xeditable','ui.select','js/controllers/studentconfig/managestud_catctrl.js'])
               
              })
                .state("app.Student-Rollno", {
                url: "/student-rollno",
                templateUrl: "tpl/Student/student_roll.html",
              })
               //added by manikandan
                .state("app.Create-RefundRule", { 
                url: "/create-refundrule",
                templateUrl: "tpl/Finance/addFeesRefund.html",
              })
                .state("app.View-RefundRule", {
                url: "/view-refundrule",
                templateUrl: "tpl/Finance/viewFeesRefund.html",
              })
                .state("app.Apply-RefundRule", {
                url: "/apply-refundrule",
                templateUrl: "tpl/Finance/applyFeesRefund.html",
              })
              .state("app.Manage-Class", {
                  url: "/manage-class",
                  controller:"manageClassCtrl",
                  templateUrl: "tpl/academics/manageClass.html",
                  resolve: load(['smart-table','js/controllers/academics/manageClassCtrl.js','xeditable','ui.bootstrap','toaster','ngBootbox'])
              })
              .state("app.Manage-Batch", {
                  url: "/manage-batch",
                  controller:"manageBatchCtrl",
                  templateUrl: "tpl/academics/manageBatch.html",
                  resolve: load(['smart-table','js/controllers/academics/manageBatchCtrl.js','xeditable','ui.bootstrap','toaster','ngBootbox'])
              })
              .state("app.manage-batchMaster", {
                  url: "/manage-batchMaster",
                  controller:"manageBatchMasterCtrl",
                  templateUrl: "tpl/academics/manageBatchMaster.html",
                  resolve: load(['smart-table','js/controllers/academics/manageBatchMasterCtrl.js','xeditable','ui.bootstrap','toaster','ngBootbox'])
              })
              .state("app.Calendar", {
                url: "/calendar",
                templateUrl: "tpl/academics/calendar.html",
                resolve: load(['moment','fullcalendar','ui.calendar','js/app/calendar/calendar.js'])
              })
               //added by gnanamani
                .state("app.Apply-Leave", {
                url: "/apply-leave",
                templateUrl: "tpl/academics/applyLeave.html",
              })
                .state("app.Add-Complaint", {
                url: "/add-complaint",
                templateUrl: "tpl/academics/addComplaint.html",
              })
                .state("app.Manage-Subjects", {
                url: "/manage-subjects",
                controller:"manageSubjectsctrl",
                templateUrl: "tpl/academics/manageSubjects.html",
                resolve: load(['smart-table','js/controllers/academics/manageSubjectsctrl.js','xeditable','ui.bootstrap','toaster'])
              })
              .state("app.View-Subjects", {
                url: "/view-subjects",
                controller:"viewSubjectsctrl",
                templateUrl: "tpl/academics/viewSubjects.html",
                params:{id1:"id1"},
                resolve: load(['smart-table','js/controllers/academics/viewSubjectsctrl.js','xeditable','ui.bootstrap','toaster','ngBootbox'])
              })
               .state("app.Grade-Level", {
                url: "/grade-level",
                controller:"gradeLevelctrl",
                templateUrl: "tpl/academics/gradeLevel.html",
                resolve: load(['smart-table','js/controllers/academics/gradeLevelctrl.js','xeditable','ui.bootstrap','toaster','ngBootbox'])
              })
                .state("app.View-Exam", {
                url: "/eiew-exam",
                templateUrl: "tpl/academics/viewOnlineExam.html",
              })
                .state("app.Add-Newexam", {
                url: "/add-newexam",
                templateUrl: "tpl/academics/addNewExam.html",
              })
              .state('app.calendar', { 
                  url: '/calendar',
                  templateUrl: 'tpl/academics/app_calendar.html',
                  resolve: load(['moment','fullcalendar','ui.calendar','js/app/calendar/calendar.js'])
              })
              .state('login', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: load( ['js/controllers/signin.js'] )
              })
              // .state('app.modal', {
              //     url: '/modal',
              //     templateUrl: 'tpl/calendar/modal.html',
              // })
              .state('app.edit-profile', {
                  url: '/edit-profile',
                  templateUrl: "tpl/edit-profile.html"
                  // resolve: load( ['js/controllers/signin.js'] )
              });
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