/**
 * Created by pqmagic on 2015/12/28.
 */
"use strict";
define(["application-configuration"]
    , function (app) {

        app.register.directive("crmDatePicker",
            function () {
                return {
                    restrict: "E",
                    require: "ngModel",
                    scope: {
                    },
                    templateUrl: jsContextPath + "resources/framework/directives/templates/date-picker-template.html",

                    link: function (scope, element, attr, ctrl) {
                        scope.format = attr.dateformat;
                        scope.dateLabel = attr.label;

                        scope.status = {
                            opened: false
                        };
                        scope.openDatePicker = function ($event) {
                            scope.status.opened = true;
                            console.log("############ " + scope.dateDirectiveValue);
                            //console.log("############ myDateValue " + scope.myDateValue);
                        };
                        ctrl.$render = function () {
                            scope.dateDirectiveValue = ctrl.$viewValue;
                            console.log("############ ctrl.$viewValue " + ctrl.$viewValue);
                        };

                        scope.dateInputeChange = function(){
                            console.log("############ .dateInputeChange ########" );
                            ctrl.$setViewValue(scope.dateDirectiveValue);
                        };

                    }
                }

            })
    }
);
