"use strict";
define(["application-configuration","./ccc","jquery","bootstrap","jquery-ui-bootstrap"], function (app) {
        app.register.controller("mainCtrl",
            ["$scope", "$rootScope", "$routeParams","blockUI","$timeout","cccService",
                function ($scope, $rootScope, $routeParams, blockUI,$timeout, cccService) {

                    $("#mu").append("MUMUNUUUUUUUUUUUUUUUUUUUUUUUUU");
                    $scope.initializeController = function () {

                    };
                    cccService.showService();
                    var myBlockUICC = blockUI.instances.get('myBlockUICC');
                    myBlockUICC.start("ADDSFSDFSD");
                    //blockUI.start("JUMPASSASASA!!!....");
                    console.log("###########################$routeParams  ::::" + angular.toJson($routeParams["name"]));
                    $scope.divText = "asdfasdfsadfadsf111111111111";
                    //$timeout(function() {
                    //    blockUI.stop();
                    //}, 1000);
                    $timeout(function() {
                        myBlockUICC.stop();
                    }, 2000);
                }
            ]);
    }
);




/*
var appa = angular.module("mainModule");
appa.controller("mainCtrl",["$scope","blockUI","$timeout", function($scope,blockUI,$timeout){
    console.log("##########  app.controller  ################" + blockUI);
    var myBlockUI = blockUI.instances.get('myBlockUI');
    console.log("##########  app.myBlockUI  ################" + myBlockUI);
// Start blocking the element.
    myBlockUI.start();
    $scope.divText = "asdfasdfsadfadsf111111111111";
    $timeout(function() {
        myBlockUI.stop();
    }, 2000);

    $scope.cli = function() {
        console.log("##############  $scope.cli #############" );
        blockUI.start();
        item.$save(function() {

            // Unblock the user interface
            blockUI.stop();

        }, 2000);
    }
}]);
    */