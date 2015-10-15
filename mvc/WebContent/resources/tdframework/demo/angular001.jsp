<!DOCTYPE html>
<%
    String contextPath = request.getContextPath();
%>
<html ng-app="todoApp">
<head>
<title>TO DO List</title>
<link type="text/css" media="screen"  href="<%=contextPath%>/resources/bootstrap3.3.5/css/bootstrap.css" rel="stylesheet">
<link type="text/css" media="screen"  href="<%=contextPath%>/resources/bootstrap3.3.5/css/bootstrap-theme.css" rel="stylesheet">
<script src="<%=contextPath%>/resources/angular-1.4.7/angular.js"></script>
<script>
	var model = {
		user : "Adam",
		items : [ {
			action : "Buy Flowers",
			done : false
		}, {
			action : "Get Shoes",
			done : false
		}, {
			action : "Collect Tickets",
			done : true
		}, {
			action : "Call Joe",
			done : false
		} ]
	};
	var todoApp = angular.module("todoApp", []);
	todoApp.controller("ToDoCtrl", function($scope) {
		$scope.todo = model;
	});
	
	alert("111");
	todoApp.controller('DoubleController', ['$scope', function($scope) {
		alert("22222");
		  $scope.double = function(value) { return value * 2; };
    }]);
</script>
</head>
<body ng-controller="ToDoCtrl">
	<div class="page-header">
		<h1>
		{{todo.user}}'s To Do List<br>
		<span class="label">{{todo.items.length}}ewewewe</span>
		</h1>
	</div>
	<div class="panel">
		<div class="input-group">
			<input class="form-control" /> <span class="input-group-btn">
				<button class="btn btn-default">Add</button>
			</span>
		</div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Description</th>
					<th>Done</th>
				</tr>
			</thead>
			<tbody>
			<tr ng-repeat="item in todo.items">
				<td>{{item.action}}</td>
				<td>{{item.done}}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<script>
	alert("333333");
	</script>
	<div ng-controller="DoubleController">
	  Two times <input ng-model="num"> equals {{ double(num) }}
	</div>
	<div class="btn btn-default">{{"AngularJS"}}</div>
</body>
</html>