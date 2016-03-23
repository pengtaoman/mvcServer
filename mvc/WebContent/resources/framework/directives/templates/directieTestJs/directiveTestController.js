/**
 * Created by pqmagic on 2015/12/28.
 */
"use strict";
var directiveController = angular.module('framework.directive.test', []);
directiveController.controller("directiveTest",
    function ($scope, $rootScope, $stateParams, blockUI, $timeout,
              $uibModal, $http, $location, $log, $compile) {

        console.log("###############  directiveTest CONTROLLER #############"  );
        $scope.myDateValue = "1988-09-09";
        $scope.getDate = function() {
            console.log(">>>>>>>>>>>>>>>>>>>   directiveTest CONTROLLER getDate: " + $scope.myDateValue);
        }
    }
);