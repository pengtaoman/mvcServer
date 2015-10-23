//alert("AAAAAAAAAAFFFFFFFFFFFFFFFFFFFFFFFF" + $window);
	var todoApp = angular.module("td.login", ['ui.bootstrap']);

    todoApp.controller('CarouselCtrl', function($scope) {
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		var slides = $scope.slides = [];
		$scope.addSlide = function() {
			var newWidth = 600 + slides.length + 1;
			slides.push({
				image : '//placekitten.com/' + newWidth
						+ '/300',
				text : [ 'More', 'Extra', 'Lots of',
						'Surplus' ][slides.length % 4]
						+ ' '
						+ [ 'Cats', 'Kittys', 'Felines',
								'Cutes' ][slides.length % 4]
			});
		};
		for (var i = 0; i < 4; i++) {
			$scope.addSlide();
		}
	});

    todoApp.controller("loginCtrl", ['$scope', function ($scope) {
    	//$scope.reset();
    	$scope.master = {};
    	//$scope.username="angular-user";
    	//$scope.userpassword="angular";
    	//$scope.reset();
    	$scope.refleshCaptcha = function(path) {
    		//alert(">>>>>" + path);
    		angular.element("#jcaptchaimg").attr("src",path + "/resources/jcaptcha.jpg");
    	};
    }]);