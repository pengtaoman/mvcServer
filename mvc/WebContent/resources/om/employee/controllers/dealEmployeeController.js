/**
 * Created by pqmagic on 2015/12/7.
 */
"use strict";
define(["application-configuration"
        ,jsContextPath+"resources/om/employee/services/dealEmployeeService.js"]
        , function (app) {
		    app.register.controller("employeeController",
		        ["$scope", "$rootScope", "$stateParams","blockUI","$timeout","$http","$location","employeeService",
		            function ($scope,$rootScope, $stateParams,blockUI,$timeout, $http, $location,employeeService) {
		                blockUI.start("Loading....");
		                $scope.txt="########## employeeController";
		                $scope.txt1 = employeeService.getTxt();
		                $timeout(function() {
		                     blockUI.stop();
		                }, 10000);
		            }]
		        );
		        
});
