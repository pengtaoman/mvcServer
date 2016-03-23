"use strict";
define(["application-configuration"], function (app) {
	app.register.service('Alert', ['$uibModal', function ($uibModal) {
        this.alert = function (txt, err) {
        	console.log(txt,"err",err);
            if((txt != null && txt.indexOf("html") > 0) || (err != null && angular.isString(err) && err.indexOf("html") > 0)){
                console.log("pop windows type is HTML" );
                this.alertHtml(txt);
            }else{
                console.log("pop windows type is TXT" );
                if(angular.isString(txt)){
                	txt = txt.replace(new RegExp(/(")/g),"");
                }
                this.alertTxt(txt, err);
            }
        };
        
        this.alertTxt = function(txt, err){
            return $uibModal.open({
                templateUrl: jsContextPath+"views/common/alert.html",
                size: 'md',
                controller: function ($scope, $modalInstance, txt) {
                    $scope.txt = txt;
                    $scope.err = err;
                    $scope.ok = function () {
                    	$modalInstance.close();
                    };
                },
                resolve: {
                    txt: function () {
                        return txt;
                    },
                    err: function () {
                        return err;
                    }
                }
            }).result;
        }
        
        this.alertHtml = function (htmltxt) {
            return $uibModal.open({
                templateUrl: jsContextPath+"views/common/alertAsHtml.html",
                size: 'md',
                controller: function ($scope, $modalInstance, htmltxt) {
                    $scope.htmltxt = htmltxt;
                    $scope.ok = function () {
                    	$modalInstance.close();
                    };
                },
                resolve: {
                    htmltxt: function () {
                        return htmltxt;
                    }
                }
            }).result;
        };
    }]).service('Confirm', ['$uibModal', function ($uibModal) {
        this.confirm = function (txt) {
            return $uibModal.open({
                templateUrl: 'views/common/confirm.html',
                size: 'md',
                controller: function ($scope, $modalInstance, txt) {
                    $scope.txt = txt;
                    $scope.ok = function () {
                        $modalInstance.close(true);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                },
                resolve: {
                    txt: function () {
                        return txt;
                    }
                }
            }).result;
        };
    }]).service('AuthService', ['$http', function ($http) {
        this.login = function (credentials) {
            return $http.post('/pub/login', credentials);
        };
        this.logout = function () {
            return $http.post('/pub/logout', {});
        };
    }])
    
    
});//OVER app.register