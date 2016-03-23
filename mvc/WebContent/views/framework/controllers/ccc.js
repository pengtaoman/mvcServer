"use strict";
console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCc--------------------------");


define(["application-configuration"], function (app) {
    app.register.service("createTab",["$http",function($http){
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCc  app.register.servicez--------------------------");
        this.showService = function() {
            console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCc SHOW ME SHOW ME SHOW ME SHOW ME -----------------------");
        }
    }])
});