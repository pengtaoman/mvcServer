/**
 * table demo
 */
"use strict";
define(["application-configuration",
        jsContextPath+"views/common/services/services.js"], function (app) {
    app.register.controller("demo6Controller",function ($rootScope,$scope,$sce) {
    	//初始化
    	$scope.dynamicTooltip = 'Hello, World!';
		$scope.dynamicTooltipText = 'dynamic';
		$scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
    })
});
