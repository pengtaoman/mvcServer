/**
 * Created by pqmagic on 2015/12/28.
 */
"use strict";
define(["application-configuration"
    ,jsContextPath+"resources/framework/directives/date-picker-directive.js"
        ,jsContextPath+"resources/framework/directives/file-upload-directive.js"]
    , function (app) {

        app.register.controller("directiveTest",
            function ($scope, $rootScope, $stateParams, blockUI, $timeout,
                      $uibModal, $http, $location, $log, $compile,$filter,FileUploader) {
                //console.log("###############  directiveTest CONTROLLER #############"  );
                $scope.myDateValue = "1908-02-09";
                $scope.getDate = function() {
                    console.log(">>>>>>>>>>>>>>>>>>>   directiveTest CONTROLLER getDate: " + $scope.myDate);
                    var myJsDate=$filter('date')($scope.myDate,'yyyy-MM-dd');
                    
                    console.log(">>>>>>>>>>>>>>>>>>>   directiveTest CONTROLLER myJsDate: " + myJsDate);
                }
                
                $scope.uploader = new FileUploader({
                    url: '/mvc/main/filesUpload'
                    //,removeAfterUpload:true
                    //,autoUpload:true
                });
                
                $scope.formdata = {
                		name:"aaa",
                		age:232,
                		all:"sdfsaAAAAAAAAAAAAfdsdfdsf2323"
                }
            }
        )
    }
);