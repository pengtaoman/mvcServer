angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:8080/mvc/resources/proangularjs/products")
    .controller("sportsStoreCtrl", function ($scope, $http, dataUrl) {

        $scope.data = {};

        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products = data;
                console.log("#################sportsStoreCtrl scope data################# ");
                console.log(angular.toJson(data));
            })
            .error(function (error) {
                $scope.data.error = error;
            });
    });
