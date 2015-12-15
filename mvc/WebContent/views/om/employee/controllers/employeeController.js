/**
 * Created by pqmagic on 2015/12/8.
 */
"use strict";
define(["../../../../../resources/application-configuration"], function (app) {
    app.register.controller("employeeController",
        ["$scope", "$rootScope", "$stateParams","blockUI","$timeout",
            function ($scope,$rootScope, $stateParams,blockUI,$timeout) {
                 console.log("#############  employeeController $stateParams : " + angular.toJson($stateParams));
            }
        ])
});