/**
 * Created by pqmagic on 2015/12/7.
 */
"use strict";
define(["application-configuration"
        ,jsContextPath+"views/om/employee/services/dealEmployeeService.js"
		,jsContextPath+"views/common/services/services.js"]
        , function (app) {

		    app.register.controller("employeeController",
		            function ($scope,$rootScope, $stateParams,blockUI,$timeout,
							  $uibModal, $http, $location,$log,$compile,$templateCache
						, employeeService ) {


						blockUI.start("Loading...");
						var formE = {"empTel":"010"};
						//console.log("###########################  " + flag);
		                $scope.txt=angular.toJson($stateParams);
		                $scope.txt1 = employeeService.getTxt();

						$scope.openEmpModal = function (size) {

							//var modalInstance = $uibModal.open({
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

						$scope.$on('$locationChangeStart',function(){
							$templateCache.remove($stateParams.func+'.html');
							console.log("###########  employeeController $locationChangeStart :::: " + angular.toJson($stateParams))
						})

		            }
			)
		        
});
