//alert("AAAAAAAAAAFFFFFFFFFFFFFFFFFFFFFFFF" + $window);
	var todoApp = angular.module("td.login", []);


	
    todoApp.controller("loginCtrl", ['$scope', function ($scope) {
    	//$scope.reset();
    	$scope.master = {};
    	$scope.username="angular-user";
    	$scope.userpassword="angular";
    	//$scope.reset();
    }]);