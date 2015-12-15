angular.module("sportsStore")
.config(function($routeProvider){
    $routeProvider.when("/placeorder", {
        templateUrl: "../../../../views/placeOrder.html"
    });
})
.controller("cartSummaryController", function ($scope, cart) {
   // alert("AAAAAAAAAAAAAAAAAAAAAAAAA");
	for (var a in $scope) {
		console.log("AAAAAAAAAAAAAAAAAAAAA  " + a);
	}
	
	console.log("AAAAAAAAAAAAAAAAAAAAA-----  " + $scope.$id);
	console.log("AAAAAAAAAAAAAAAAAAAAA-----  " + $scope.$parent);
	
   for (var a in $scope.$parent) {
		console.log("AAAAAAAAAAAAAAAAAAAAA $scope.$parent : " + a);
	}
    $scope.cartData = cart.getProducts();

    $scope.total = function () {
        var total = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
            total += ($scope.cartData[i].price * $scope.cartData[i].count);
        }
        return total;
    }

    $scope.remove = function (id) {
        cart.removeProduct(id);
    }
});
