/**
 * Created by pqmagic on 2015/12/7.
 */
// application-configuration.js

"use strict";
define(["angularAMD",
        "angular-locale",
        "angular-touch",
        "angular-animate",
        "angular-route",
        "ui-bootstrap",
        "angular-sanitize",
        "ui-router",
        //"ui-grid",
        //"ngDialog",
        "blockUI",
        "jquery",
        "bootstrap",
        //"jquery-ui-bootstrap",
        "fast-click",
        //"inputmask",
        "framework-service",
        "framework-directive",
        "framework-directiveTestController",
        "framework-filter","main-page-app"
       ,"directiveTestController.js"
    ],
    function (angularAMD) {
        var app = angular.module("framework.app",
            ["ui.router","ngTouch",
                //"ui.grid","ui.grid.resizeColumns","ui.grid.selection",
                //"ui.grid.pinning","ui.grid.edit","ui.grid.pagination",
                //"ngDialog",
                "blockUI", "ngSanitize",
                "ui.bootstrap",
                "framework.service","framework.filter","framework.directive", "framework.directive.test"]);

        //app.config(['$stateProvider','$urlRouterProvider',
        //    '$locationProvider', 'blockUIConfig',
        //    function ($stateProvider, $urlRouterProvider, $locationProvider, blockUIConfig) {
        //        blockUIConfig.delay = 0;
        //
        //        $locationProvider.html5Mode(true);
        //}]);
        app.run(['$rootScope', '$location', function($rootScope, $location) {
            $rootScope.$on('$stateChangeSuccess', function(evt, next, previous) {
                //for (var a in next) {
                //console.log("########## $routeChangeSuccess next :" + a);
                //}
                //console.log("##########  next.url :" + next.url);
                //console.log("##########  previous.url :" + previous.url);
                //console.log("##########  previous.params :" + angular.toJson(previous.params));
            });


        }]);
        // Bootstrap Angular when DOM is ready
        angularAMD.bootstrap(app);


        app.controller("mainController",function($stateParams, $scope, $location, $http, $compile,$timeout,
                                                 $uibModal,$templateCache, blockUI, showMenuService, i18nService) {
            $scope.langs = i18nService.getAllLangs();
            $scope.lang = 'zh-cn';
            $scope.animationsEnabled = true;

            blockUI.start("Loading...");
            $scope.init = function() {

            };
            $scope.texx = "texxtexxtexx111111111";
            $scope.rootMenu = [];
            $scope.subMenu = [];

            var promise = $http({
                method: 'GET',
                url: jsContextPath + "resources/data/menu.json"
                //url: "/mvc/app01/getMenu"//"resources/data/menu.json"
            });
            promise.then(function (resp) {
                //console.log(":::::" + angular.toJson(resp.data));

                angular.forEach(resp.data, function (menu) {
                    if (angular.equals(menu["fParentMenuId"], "")) {
                        $scope.rootMenu.push(menu);
                    } else {
                        $scope.subMenu.push(menu);
                    }
                });
                //console.log("################### promise menu over!!!!");
            }, function error(msg) {
                console.error('Failure!', msg);
                blockUI.stop();
            }).then(function () {
                var strHtml = showMenuService.getMenuHtml($scope.rootMenu, $scope.subMenu);
                $scope.menuTree = strHtml;
                //var menuDirect = angular.element(strHtml);
                $("#showMenuDiv").append(strHtml);
                //$compile(showDiv)($scope);
                //console.log("################### promise menu over222!!!!");
                blockUI.stop();
            });

            $scope.$on('$locationChangeStart',function(){
                if (angular.isDefined($templateCache)) {
                    $templateCache.remove(jsContextPath+"views/"+ $stateParams.pack +"/"+$stateParams.model+"/"+$stateParams.func+".html");
                    //$templateCache.removeAll();
                }
                console.log("###########  $templateCache removed : " + jsContextPath+"views/"+ $stateParams.pack +"/"+$stateParams.model+"/"+$stateParams.func+".html")
            })
        });

        return app;
    });

