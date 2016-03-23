/**
 * table demo
 */
"use strict";
define(["application-configuration",
        jsContextPath+"views/common/services/services.js"], function (app) {
    app.register.controller("demo2Controller",function ($rootScope,$scope,Alert) {
    	//初始化
    	$scope.dynamicPopover = {
		    content: 'Hello, World!',
		    templateUrl: 'myPopoverTemplate.html',
		    title: 'My popover Title'
		 };

    })
});
