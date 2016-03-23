/**
 * table demo
 */
"use strict";
define(["application-configuration",
        jsContextPath+"views/common/services/services.js",
        jsContextPath+"views/common/filter/filter.js",
        jsContextPath+"views/demo/table/services/demoServices.js",
        jsContextPath+"views/demo/table/filter/demoFilter.js"], function (app) {
	
    app.register.controller("demo1Controller",function ($rootScope,$scope,Alert) {
    	//初始化
    	var info = $scope.info = {};
    	info.size = 10;//每页显示5条
    	info.page = 1;//第1页
    	info.choices = [{label:'请选择状态', value:null}, {label:'待提交', value:1}, {label: '退回', value:2}, {label: '待审批',value:3}, {label: '完成',value:4}];
    	
    	//这里前台模拟  获取数据
    	$scope.getDataByPage = function(page,size){
    		var total = 1000;
    		$scope.cartRecords = [];
        	var start=(page-1)*size;
        	if(start<0){
        		start = 0;
        	}
        	var end = page*size;
        	if(end>total){
        		end = total;
        	}
        	for(start;start<end;start++){
        		var cart = {};
        		cart.status =  start%6;
        		cart.id = 86000+start;
        		cart.user={name: "numb"+start};
        		cart.total = 100+start;
        		cart.mt = new Date();
        		$scope.cartRecords.push(cart);
        	}
        	return total;
    	}
    	
    	$scope.getRefresh = function (){
    		$scope.info.total = $scope.getDataByPage($scope.info.page,$scope.info.size);
      	}
    	//页面初始化一次
    	$scope.getRefresh();
    	
    	//监控页面的页码变化
    	$scope.$watch('info.page', function (newVal, oldVal) {
            if (oldVal != null && newVal != oldVal) {
                $scope.info.page = newVal;
                $scope.getRefresh();
            }
        });
    	
    	$scope.changeStatus = function(cid){
    		angular.forEach(info.choices, function(c){
    			if(cid == c.value){
    				Alert.alert("当前选中的为:"+c.label);
    			}
	        });
    		
    	}
    	
    	$scope.popcartview =function(cartid){
    		Alert.alert("当前选中的cartid为:"+cartid);
    	}
    	
    	console.log("$scope.cartRecords",$scope.cartRecords);
    });
});
