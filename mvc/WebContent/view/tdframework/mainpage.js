	var todoApp = angular.module("td.main", [], function(){
        
		$('#menu').metisMenu();
		$('#navbar').collapse({
		  toggle: false
		});
		var tabs = $('#tabsTitle').tabs();
		tabs.tabs('option', 'fx', { opacity: 'toggle' });  
	    createTab('hellotdf',"欢迎----alalasdfasdfasdfasdfsd");
	    
		tabs.tabs({	
		    select: function(event, ui) {
	        
	        }
		});
		tabs.on( "click",'span.ui-icon-close', function() {
		    var panelId = $( this ).closest( "li" ).attr( "aria-controls" );
		    $( "#" + panelId ).remove();
		    $( this ).closest( "li" ).remove();
	
		    tabs.tabs( "refresh" );
		    
		    //alert("BBBBB  " + tabs.tabs( 'length' ));
		    if (tabs.tabs( 'length' ) == 0) {
		    	createTab('hellotdf',"欢迎----alalasdfasdfasdfasdfsd");
		    	tabs.tabs('select' , 0); 
		    } 
		    
		});
	});
	


	
	var tabTemplate = "<li id='@{tabliid}'><a href='@{href}'>@{label} </a><span class='ui-icon ui-icon-close' style='float:right;cursor:pointer;'>Remove Tab</span></li>";

	var createTab = function createTab(id, label) {
		//alert(contextPath);
		var tabs = $('#tabsTitle').tabs();
		if (!document.getElementById("tabdiv_" + id)) {
		    var li = $( tabTemplate.replace( /@\{tabliid\}/g, "tabli_" + id ).replace( /@\{href\}/g, "#tabdiv_" + id ).replace( /@\{label\}/g, label ) );
			tabs.find( ".ui-tabs-nav" ).append( li );
			tabs.append( "<div id='tabdiv_" + id + "' style='height:100%;padding:0px;'><iframe id='tabiframe_" + id + "' class='iframecss' src='"+contextPath+"/main/hello11.do'></iframe></div>" );
			tabs.tabs( "refresh" );
		    tabs.tabs('select' , "#tabdiv_"+id); 
		} else {
			tabs.tabs('select' , "#tabdiv_"+id); 
		}
	}

    todoApp.controller('headController', function($scope,$location, $http) {
    	alert("###########  " + $location.path());
    	
    	$scope.sysParent = [];
    	$scope.sysSub = [];
    	$http({
			url: contextPath+"/main/getSys",
			method:'GET'
			}).success(function(data,header,config,status){
			//响应成功
				
			   // alert(angular.toJson(data));
				//alert(data);
				angular.forEach(data, function(system) {
					//console.log(angular.toJson(system));
					//console.log("----" + system['fparentSystemId']);
					if (angular.equals(system['fparentSystemId'],'')) {
						$scope.sysParent.push(system);
					} else {
						$scope.sysSub.push(system);
					}
				});
				console.log("++++PPPPP : " + angular.toJson($scope.sysParent));
				console.log("++++SSSSS : " + angular.toJson($scope.sysSub));
			}).error(function(data,header,config,status){
			//处理响应失败
		});
    	
    	
    	
    	$scope.subSysFilter =  function(a, b) {
				console.log("++++=========AAAA="+a+"---------" + b );
				//console.log("####################  "+$scope.parentSystem);
				if (angular.equals(a, b)) {
					return true;
				}
				return false;
		};
        
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
    
    todoApp.controller('tabsController', function($scope) {
    	var tabs = $('#tabsTitle').tabs();
    	tabs.tabs('option', 'fx', { opacity: 'toggle' });  
		    createTab('hellotdf',"欢迎----alalasdfasdfasdfasdfsd");
		    
			tabs.tabs({
			    select: function(event, ui) {
		        
		        }
		});
    });
    
    todoApp.controller('menuController', function($scope, $http) {
    	
    	
    });
    
