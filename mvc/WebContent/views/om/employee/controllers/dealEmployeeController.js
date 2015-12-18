/**
 * Created by pqmagic on 2015/12/7.
 */
"use strict";
define(["application-configuration"
        ,jsContextPath+"views/om/employee/services/dealEmployeeService.js"
		,jsContextPath+"views/om/employee/directives/func.js"
		,jsContextPath+"views/om/employee/directives/employeeDirective.js"]
        , function (app) {

		    app.register.controller("employeeController",
		            function ($scope,$rootScope, $stateParams,blockUI,$timeout,
							  $uibModal, $http, $location,$log,$compile, employeeService) {
						$scope.init();

						blockUI.start("Loading...");
						var formE = {"empTel":"010"};
		                $scope.txt="########## " + formE.empTel;
		                $scope.txt1 = employeeService.getTxt();

						$scope.openEmpModal = function (size) {

							var modalInstance = $uibModal.open({
								animation: $scope.animationsEnabled,
								templateUrl: jsContextPath+"views/om/employee/empModalHtml.html",
								controller: function($scope,$uibModalInstance){

									console.log("###############  modal dialog $scope :: " +  $scope.txt);
									//$("#empTel").inputmask("d/m/y");
									$scope.emailBlur = function() {

									};

									$scope.closeModal = function() {
										//modalInstance.close();
										//formE.empTel = $("#empTel").val();
										$uibModalInstance.close($("#empTel").val());
									};

									$scope.empEngageDate = new Date();
									$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd-MM-yyyy', 'shortDate'];
									$scope.format = $scope.formats[2];

									$scope.status = {
										opened: false
									};

									$scope.openDatePicker = function($event) {
										$scope.status.opened = true;
									};

									$scope.addEmployee = function() {

										if(angular.isUndefined($scope.addEmployee)) {
											console.log("#################### ERROR " + $scope.addEmployee);
											return;
										}
										//console.log("#################### $scope.empTel :: " +$scope.empTel);
										//console.log("####################" + $scope.addEmployee);
										var formDate = {
											empName:$scope.empName,
											empTel:$("#empTel").val(),
											empEmail:$scope.empEmail,
											empMale:$scope.empMale,
											empEngageDate:$('#empEngageDate').val()
										};
										console.log("#################### formDate :: " + angular.toJson(formDate));
										console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + $("#empEmail").val());
									}
								},
								size: 'lg',
								//backdrop: 'static',
								//keyboard: false,

								resolve: function(){
									console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>modalInstance.open before  " + $('#empEngageDate').val());
								}
							});

							var promiseOpened = modalInstance.rendered;
							promiseOpened.then(function(){
								console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>modalInstance.opened  " + $('#empEmail').val());
								$(":input").inputmask();
							});

							modalInstance.result.then(function(eTel){
								console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>modalInstance.result  " + eTel);
								$scope.txt=eTel;
							});

						};

						blockUI.stop();

						console.log("#################### username： " + $scope.rootMenu.length);

		            }
			);

		    app.register.controller("employeeLstController",
				function ($scope,$rootScope,
						  $stateParams,blockUI,$timeout,
						  $http, $location,$log,
						  uiGridPaginationService,employeeService) {
					$scope.txt1 = employeeService.getTxt();

					var promise = $http({
						method: 'GET',
						url: jsContextPath + "resources/data/employee.json"
						//url: "/mvc/app01/getEmp"//"resources/data/menu.json"
					});
					promise.then(function (resp) {
						//console.log(":::::" + angular.toJson(resp.data));
						$scope.myData = resp.data;
						$scope.gridEmp.data = $scope.myData;
					}, function error(msg) {
						console.error('Failure!', msg);
						blockUI.stop();
					});

					$scope.gridEmp = {
						paginationPageSize: 9,
						columnDefs: [
							{field: 'fEmployeeName', name: '员工姓名' ,width: 200},
							{field: 'fEmployeeId', name: 'ID',width: 200},
							{field: 'fEmail', name: '电子邮件',width: 200},
							{field: 'edit', name: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)" >Edit</button> '}
						]
					};

					function getPage(){

					}
					console.log("VVVVVVVVVVV  uiGridPaginationService :" + uiGridPaginationService);

					//uiGridPaginationService.initializeGrid();
					$scope.gridEmp.onRegisterApi = function(gridApi){
						var currentPage = gridApi.pagination.getPage();
						var totalPages = gridApi.pagination.getTotalPages();
						console.log("VVVVVVVVVVV  currentPage :" + currentPage);
						console.log("VVVVVVVVVVV  totalPages :" + totalPages);
						gridApi.pagination.on.paginationChanged($scope, function (currentPage, pageSize) {
							//gridApi.paginationOptions.pageNumber = newPage;
							//$log.log('gridApi.pagination.on.paginationChanged =======grid============' + grid);
							$log.log('gridApi.pagination.on.paginationChanged =======pageSize============' + pageSize);
							$log.log('gridApi.pagination.on.paginationChanged =======currentPage============' + currentPage);
							//paginationOptions.pageSize = pageSize;
							//getPage();
						});
						//$log.log('navigation event===================' +gridApi.pagination.nextPage());
					};

				}
			);
		        
});
