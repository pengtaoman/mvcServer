"use strict";
define(["application-configuration"], function (app) {
	app.register.filter('yuan', function () {
        return function (input) {
        	if(angular.isNumber(input)){
        		return (input / 100).toFixed(2);
        	}else{
        		return 0;
        	}
        };
    });
});