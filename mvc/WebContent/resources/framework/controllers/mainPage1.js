/**
 * Created by pqmagic on 2015/12/7.
 */
"use strict";
define(["application-configuration"], function (app) {
    app.register.controller("welcomeController",
        ["$scope", "$rootScope", "$stateParams","blockUI","$timeout","$http","$location",
            function ($scope,$rootScope, $stateParams,blockUI,$timeout, $http, $location) {
                //$scope.rootMenu = [];
                $scope.txt="$scope.txt？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？";
                //blockUI.start("MENU....");
                //
                //console.log("########################### $location3######################## "+ $location.path()+"###" + $scope.$id );
                //var promise = $http({
                //    method:'GET',
                //    url:'/myAngular/app/resources/data/menu.json'
                //});
                //promise.then(function(resp){
                //    console.log(":::::" + resp.data.length);
                //    angular.forEach(resp.data, function(menu) {
                //        if (angular.equals(menu["fParentMenuId"],"")) {
                //            $scope.rootMenu.push(menu);
                //        }
                //    });
                //    console.log("################### promise menu over!!!!");
                //    //for (var menu in resp) {
                //    //    console.log(menu.fParentMenuId);
                //    //    //if (angular.isEmpty(menu.fParentMenuId)) {
                //    //    //    $scope.rootMenu.push(menu);
                //    //    //}
                //    //}
                //});
                //blockUI.stop();
            }
        ])
});
