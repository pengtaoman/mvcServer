/**
 * Created by pqmagic on 2015/12/7.
 */
// application-configuration.js

"use strict";
define(["angularAMD",
        "jquery",
        "angular-route",
        
        
        "ui-bootstrap",
        "angular-sanitize",
        "blockUI",
        "ui-router",
        "ui-grid",
        "bootstrap",
        "jquery-ui-bootstrap",
        "framework-service",
        "framework-directive",
        "framework-filter","main-page-app"

    ],
    function (angularAMD) {
        var app = angular.module("framework.app",
            ["ui.router", "blockUI", "ngSanitize", "ui.bootstrap","framework.service","framework.filter","framework.directive"]);

        app.config(['$stateProvider','$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider.state("main",
                angularAMD.route({
                    url: "/",
                    params: {
                    },
                    views :{"ui_view_main":{
                        templateUrl: function(params){
                            console.log("?????????????????????" + angular.toJson(params));
                            return jsContextPath+'views/framework/welcom.html';
                        }
                    }},
                    resolve: {
                        load: ["$q", "$rootScope", "$location","blockUI","$timeout","$stateParams",
                            function ($q, $rootScope, $location,blockUI,$timeout,$stateParams) {
                                var deferred = $q.defer();
                                require([jsContextPath+"resources/framework/controllers/mainPage1.js"], function () {
                                    $rootScope.$apply(function () {
                                        deferred.resolve();
                                    });
                                });

                                return deferred.promise;
                            }]
                    }
                })
            ).state("buss",
                angularAMD.route({
                    url: "/:pack/:model/:func",
                    params: {
                    },
                    views :{"ui_view_main" : {
                        templateUrl: function(params){
                            console.log("############angularAMD.route params : " + angular.toJson(params));
                            return jsContextPath+"views/"+ params.pack +"/"+params.model+"/"+params.func+".html";
                        }
                    }},
                    resolve: {
                        load: ["$q", "$rootScope", "$location","blockUI","$timeout","$stateParams",
                            function ($q, $rootScope, $location,blockUI,$timeout,$stateParams) {
                                blockUI.start("Loading....");
                                var deferred = $q.defer();
                                require([jsContextPath+"resources/"+ $stateParams.pack +"/"+$stateParams.model+"/controllers/"+$stateParams.func+"Controller.js"], function () {
                                    $rootScope.$apply(function () {
                                        deferred.resolve();
                                    });
                                });
                                $timeout(function() {
                                    blockUI.stop();
                                }, 10000);
                                return deferred.promise;
                            }]
                    }
                })
            )
        }]);
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


        app.controller("mainController",function($scope, $location, $http, $compile, showMenuService) {
            $scope.texx = "texxtexxtexx111111111";
            $scope.rootMenu = [];
            $scope.subMenu = [];
            var promise = $http({
                method:'GET',
                url:jsContextPath+"main/getMenu"//"resources/data/menu.json"
            });
            promise.then(function(resp){
                console.log(":::::" + angular.toJson(resp.data));
                angular.forEach(resp.data, function(menu) {
                    if (angular.equals(menu["fParentMenuId"],"")) {
                        $scope.rootMenu.push(menu);
                    } else {
                        $scope.subMenu.push(menu);
                    }
                });
                //console.log("################### promise menu over!!!!");
            }).then(function(){
                var strHtml = showMenuService.getMenuHtml($scope.rootMenu, $scope.subMenu);
                var menuDirect = angular.element(strHtml);
                var showDiv = $("#showMenuDiv").append(menuDirect);
                //$compile(showDiv)($scope);
                console.log("################### promise menu over222!!!!");
            });
        });

        return app;
    });

