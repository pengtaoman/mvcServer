/**
 * table demo
 */
"use strict";
define(["application-configuration",
        jsContextPath+"views/common/services/services.js"], function (app) {
    app.register.controller("demo7Controller",function ($rootScope,$scope,crmModel,$log) {
    	//初始化
    	$scope.items = ['item1', 'item2', 'item3'];
    	$scope.animationsEnabled = true;
    	$scope.open = function (size) {
    	var modalInstance = crmModel.open({
    	      animation: $scope.animationsEnabled,
    	      templateUrl: 'myModalContent.html',
    	      controller:  'ModalInstanceCtrl',
    	      size: size,
    	      resolve: {
    	        items: function () {
    	          return $scope.items;
    	        }
    	      }
    	 });
    	 modalInstance.result.then(function (selectedItem) {
    	      $scope.selected = selectedItem;
    	 }, function () {
    	      $log.info('Modal dismissed at: ' + new Date());
    	    });
    	 };
    	 $scope.toggleAnimation = function () {
    	    $scope.animationsEnabled = !$scope.animationsEnabled;
    	 };
    }).controller("ModalInstanceCtrl",function ($rootScope,$scope,$uibModalInstance,crmModelInstance,items) {
	      //初始化
	      $scope.items = items;
    	  $scope.selected = {
    	    item: $scope.items[0]
    	  };
    	  $scope.ok = function () {
    		  crmModelInstance.close($uibModalInstance,$scope.selected.item);
    	  };
    	  $scope.cancel = function () {
    		  crmModelInstance.dismiss($uibModalInstance,'cancel');
    	  };
    })
});
