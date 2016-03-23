/**
 * Created by pqmagic on 2015/12/15.
 */
"use strict";
define(["application-configuration"]
    , function (app) {

        app.register.directive("empForm",
            function () {
                //console.log("::::::::::::::::::::::::::::::::" + angular.toJson(cart));
                return {
                    restrict: "E",
                    templateUrl: jsContextPath + "views/om/employee/cartSummary.html",
                    controller: function ($scope) {

                        //var cartData = cart.getProducts();
                        //
                        //$scope.total = function () {
                        //    var total = 0;
                        //    for (var i = 0; i < cartData.length; i++) {
                        //        total += (cartData[i].price * cartData[i].count);
                        //    }
                        //    return total;
                        //}
                        //
                        //$scope.itemCount = function () {
                        //    var total = 0;
                        //    for (var i = 0; i < cartData.length; i++) {
                        //        total += cartData[i].count;
                        //    }
                        //    return total;
                        //}
                    }
                };
            }
        );

    });