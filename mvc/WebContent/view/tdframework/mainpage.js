	var todoApp = angular.module("td.main", []);

    todoApp.controller('headController', function($scope) {
    	$scope.sidebarClick = function() {
    		
    		//alert($('#sidebarDiv').css('margin-left'));
	    	if ($('#sidebarDiv').css('margin-left') == '0px') {
				$('#sidebarDiv').css('transition-duration','.5s');
				//$('#sidebarDiv').css('position','relative');
				$('#sidebarDiv').css('margin-left',-1-$('#sidebarDiv').width());
				
				$('#mainDiv').css('transition-duration','.5s');
				$('#mainDiv').attr('class','col-md-12 main');
				//$('#mainDiv').css('position','relative');
				//$('#mainDiv').removeAttr('left');
				$('#sidebarCtrl').attr('class','glyphicon glyphicon-chevron-right sidebarCtrl');
		
			} else {
				$('#sidebarDiv').css('transition-duration','.5s');
				//$('#sidebarDiv').css('position','relative');
				$('#sidebarDiv').css('margin-left','0px');
				//$('#sidebarDiv').attr('class','col-sm-3 col-md-2 sidebarDiv');//.attr('class','display: none;');
				$('#mainDiv').attr('class','col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main');
				$('#mainDiv').css('left',null);
				$('#sidebarCtrl').attr('class','glyphicon glyphicon-chevron-left sidebarCtrl');
			}
    	}
    });