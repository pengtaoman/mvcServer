/**
 * Created by pqmagic on 2015/12/7.
 */
// application-configuration.js

"use strict";
define(["angularAMD",//"jquery",
        "angular-locale",
        "angular-touch",
        "angular-animate",
        "angular-route",
        "angularFileUpload",
        "ui-bootstrap",
        "angular-sanitize",
        "ui-router",
        "blockUI",
        "framework-service",
        "framework-directive",
        "framework-filter","main-page-app"

    ],
    function (angularAMD) {
        var app = angular.module("framework.app",
            ["ui.router","ngTouch",
                "blockUI", "ngSanitize",
                "ui.bootstrap","angularFileUpload",
                "framework.service","framework.filter","framework.directive"]);

        app.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json;odata=verbose'
            };

            $httpProvider.interceptors.push(function($q, $location, $window) {
                return {
                    'response': function(response) {
                        if (angular.equals(response.data, 'error:302')) {
                            //
                            $window.location.href = "/mvc/main/tdlogin"
                        }
                        return response;
                    }
                };
            });
        }]);
        app.config(['$stateProvider','$urlRouterProvider',
            '$locationProvider', 'blockUIConfig',
            function ($stateProvider, $urlRouterProvider, $locationProvider, blockUIConfig) {
            blockUIConfig.delay = 0;
            $urlRouterProvider.otherwise("/");

            $stateProvider.state("main",
                angularAMD.route({
                    url: "/",
                    params: {
                    },
                    views :{"ui_view_main":{
                        templateUrl: function(params){
                            //console.log("?????????????????????" + angular.toJson(params));
                            return jsContextPath+'views/framework/welcom.html';
                        }
                    }},
                    resolve: {
                        load: ["$q", "$rootScope", "$location","blockUI","$timeout","$stateParams",
                            function ($q, $rootScope, $location,blockUI,$timeout,$stateParams) {
                                var deferred = $q.defer();
                                require([jsContextPath+"views/framework/controllers/welcomeController.js"], function () {
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
                                //blockUI.start("Loading....");
                                //console.log("#######################  blockUI.start ###########" );
                                var deferred = $q.defer();
                                require([jsContextPath+"views/"+ $stateParams.pack +"/"+$stateParams.model+"/controllers/"+$stateParams.func+"Controller.js"], function () {
                                    $rootScope.$apply(function () {
                                        deferred.resolve();
                                    });
                                });
                                //$timeout(function() {
                                //    blockUI.stop();
                                //}, 10000);
                                return deferred.promise;
                            }]
                    }
                })
            );
                $locationProvider.html5Mode(true);
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

        app.controller("mainController",function($stateParams, $scope, $location, $http, $compile,$timeout,
                                                 $uibModal, $templateCache,  blockUI, showMenuService) {

            $scope.lang = 'zh-cn';
            $scope.animationsEnabled = true;

            blockUI.start("Loading...");
            $scope.init = function() {
                $(":input").inputmask();
            };
            $scope.texx = "texxtexxtexx111111111";
            $scope.rootMenu = [];
            $scope.subMenu = [];

            var promise = $http({
                method: 'GET',
                //url: jsContextPath + "resources/data/menu.json"
                url: "/mvc/main/getMenu"//"resources/data/menu.json"
            });
            promise.then(function (resp) {
                //console.log(":::::" + resp.data);

                angular.forEach(resp.data, function (menu) {
                    if (angular.equals(menu["fParentMenuId"], "")) {
                        $scope.rootMenu.push(menu);
                    } else {
                        $scope.subMenu.push(menu);
                    }
                });
                return resp;
                //console.log("################### promise menu over!!!!");
            }, function error(msg) {
                console.error('Failure!', msg);
                blockUI.stop();
            }).then(function (aaa) {
                //console.log("###################################" + angular.toJson(aaa.data));
                var strHtml = showMenuService.getMenuHtml($scope.rootMenu, $scope.subMenu);
                //var menuDirect = angular.element(strHtml);
                var showDiv = $("#showMenuDiv").append(strHtml);
                //$compile(showDiv)($scope);
                //console.log("################### promise menu over222!!!!");
                blockUI.stop();
            });

            $scope.$on('$locationChangeStart',function(){
                if (angular.isDefined($templateCache)) {
                    $templateCache.remove(jsContextPath+"views/"+ $stateParams.pack +"/"+$stateParams.model+"/"+$stateParams.func+".html");
                }
                console.log("###########  $templateCache removed : " + jsContextPath+"views/"+ $stateParams.pack +"/"+$stateParams.model+"/"+$stateParams.func+".html")
            })
        });
        // Bootstrap Angular when DOM is ready
        angularAMD.bootstrap(app);
        return app;
    });

