/**
 * table demo
 */
"use strict";
define(["application-configuration",
        jsContextPath+"views/common/services/services.js"], function (app) {
    app.register.controller("demo4Controller",function ($rootScope,$scope,Alert) {
    	$scope.tabs = [
           { title:'Dynamic Title 1', content:'Dynamic content 1' },
           { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
         ];

         $scope.alertMe = function() {
           setTimeout(function() {
             $window.alert('You\'ve selected the alert tab!');
           });
         };
    })
});
