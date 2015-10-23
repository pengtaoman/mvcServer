<!DOCTYPE html>
<html>

<head>

<%
    String contextPath = request.getContextPath();
%>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1">
<title>metisMenu</title>

<link media="screen" href="<%=contextPath%>/resources/common/bootstrap/css/bootstrap.css" rel="stylesheet">
<link media="screen" href="<%=contextPath%>/resources/common/jquery-ui-bootstrap/css/custom-theme/jquery-ui-1.10.0.custom.css" rel="stylesheet"/>
<link media="screen" href="<%=contextPath%>/resources/common/jquery-ui-bootstrap/assets/css/docs.css" rel="stylesheet">
<link media="screen" href="<%=contextPath%>/resources/common/bootstrap/css/font-awesome.min.css" rel="stylesheet">
<link media="screen" href="<%=contextPath%>/resources/common/metismenu/metisMenu.min.css" rel="stylesheet">
<link media="screen" href="<%=contextPath%>/resources/tdframework/sidebar.css" rel="stylesheet">

<script src="<%=contextPath%>/resources/common/jquery/jquery-1.11.3.min.js"></script>
<script src="<%=contextPath%>/resources/common/bootstrap/js/bootstrap.min.js"></script>
<script src="<%=contextPath%>/resources/common/metismenu/metisMenu.min.js"></script>


<script src="<%=contextPath%>/resources/common/jquery-ui-bootstrap/js/jquery-ui-1.9.2.custom.min.js" type="text/javascript"></script>
<script src="<%=contextPath%>/resources/common/angular/angular.min.js"></script>

<script src="<%=contextPath%>/view/tdframework/mainpage.js"></script>

</head>

<body ng-app="td.main">

	<nav class="navbar navbar-default navbar-static-top navbar-fixed-top" role="navigation" ng-controller="headController">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">TDFramework3.0&nbsp;<span
					id="sidebarCtrl"
					class="glyphicon glyphicon-chevron-left sidebarCtrl"
					aria-hidden="true" ng-click="sidebarClick()"></span></span></a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li class="active"><a href="index.html">Vertical Menu</a></li>
					<li><a href="metisFolder.html">Folder View</a></li>
					<li><a href="hover.html">Hover Option For Desktop</a></li>
					<li><a href="zurb.html">Foundation | Zurb</a></li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>


	<div class="container-fluid">
		<div class="row">
				<div id="sidebarDiv" class="col-sm-3 col-md-2 sidebarDiv clearfix ">
					<aside class="sidebar">
						<nav class="sidebar-nav">
							<ul class="metismenu" id="menu">
								<li class="active"><a href="#" aria-expanded="true"> <span
										class="sidebar-nav-item-icon fa fa-github fa-lg"></span> <span
										class="sidebar-nav-item">metisMenu</span> <span
										class="fa arrow"></span>
								</a>
									<ul aria-expanded="true">
										<li><a href="javascript:createTab('forkdemo','叉子');">
												<span class="sidebar-nav-item-icon fa fa-code-fork"></span>
												Fork
										</a></li>
										<li><a href="https://github.com/onokumus/metisMenu">
												<span class="sidebar-nav-item-icon fa fa-star"></span> Star
										</a></li>
										<li><a
											href="https://github.com/onokumus/metisMenu/issues"> <span
												class="sidebar-nav-item-icon fa fa-exclamation-triangle"></span>
												Issues
										</a></li>
									</ul></li>
								<li><a href="#" aria-expanded="false">Menu 0 <span
										class="fa arrow"></span></a>
									<ul aria-expanded="false">
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
										<li><a href="#">item 0.1</a></li>
										<li><a href="#">item 0.2</a></li>
										<li><a href="http://onokumus.com">onokumus</a></li>
										<li><a href="#">item 0.4</a></li>
									</ul></li>
								<li><a href="#" aria-expanded="false">Menu 1 <span
										class="glyphicon arrow"></span></a>
									<ul aria-expanded="false">
										<li><a href="#">item 1.1</a></li>
										<li><a href="#">item 1.2</a></li>
										<li><a href="#" aria-expanded="false">Menu 1.3 <span
												class="fa plus-times"></span></a>
											<ul aria-expanded="false">
												<li><a href="#">item 1.3.1</a></li>
												<li><a href="#">item 1.3.2</a></li>
												<li><a href="#">item 1.3.3</a></li>
												<li><a href="#">item 1.3.4</a></li>
											</ul></li>
										<li><a href="#">item 1.4</a></li>
										<li><a href="#" aria-expanded="false">Menu 1.5 <span
												class="fa plus-minus"></span></a>
											<ul aria-expanded="false">
												<li><a href="#">item 1.5.1</a></li>
												<li><a href="#">item 1.5.2</a></li>
												<li><a href="#">item 1.5.3</a></li>
												<li><a href="#">item 1.5.4</a></li>
											</ul></li>
									</ul></li>
								<li><a href="#" aria-expanded="false">Menu 2 <span
										class="glyphicon arrow"></span></a>
									<ul aria-expanded="false">
										<li><a href="#">item 2.1</a></li>
										<li><a href="#">item 2.2</a></li>
										<li><a href="#">item 2.3</a></li>
										<li><a href="#">item 2.4</a></li>
									</ul></li>
							</ul>
						</nav>
					</aside>

				</div>


			<div id="mainDiv"
				class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    
				<!-- <div class="row placeholders"></div>-->
				<!--  <section class="content"> </section>
				<div class="panel panel-default bodyPanel"></div>
				-->
					<div class="panel-body bodyPanel">
						<div id="tabsTitle" style="border-radius:0px;padding:0px;height:100%;">
							<ul id="tabsHeader" style="border-radius:0px;padding:0px;padding-left:2px;background-color: #428bca;">
							</ul>
						</div>
					</div>
					<footer class="bodyfooter">
						<div>
							dddddddddddddd=============================ddddddddddddddddddd
						</div>
					</footer>
			</div>
		</div>
	</div>
	



	<script>
    $(function() {

      $('#menu').metisMenu();

      $('#menu2').metisMenu({
        toggle: false
      });

      $('#menu3').metisMenu({
        doubleTapToGo: true
      });

      $('#menu4').metisMenu();

    });
  </script>
	<script>
$(document).ready(function(){
	tabs = $('#tabsTitle').tabs();
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
	alert("AAAAAAAAAAAAAAAAAAAA");

	$('#navbar').collapse({
	  toggle: false
	});
	/*
	$('#sidebarCtrl').on("click",function(){
		
		if ($('#sidebarCtrl').attr('class') == 'glyphicon glyphicon-chevron-left sidebarCtrl') {
			$('#sidebarDiv').css('transition-duration','.5s');
			//$('#sidebarDiv').css('position','relative');
			$('#sidebarDiv').css('margin-left',-1-$('#sidebarDiv').width());//.attr('class','display: none;');
			
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
	});
	*/
});


var tabTemplate = "<li id='@{tabliid}'><a href='@{href}'>@{label} </a><span class='ui-icon ui-icon-close' style='float:right;cursor:pointer;'>Remove Tab</span></li>";

function createTab(id, label) {
	//alert(document.getElementById("tabdiv_" + id));
	if (!document.getElementById("tabdiv_" + id)) {
	    var li = $( tabTemplate.replace( /@\{tabliid\}/g, "tabli_" + id ).replace( /@\{href\}/g, "#tabdiv_" + id ).replace( /@\{label\}/g, label ) );
		tabs.find( ".ui-tabs-nav" ).append( li );
		tabs.append( "<div id='tabdiv_" + id + "' style='height:100%;padding:0px;'><iframe id='tabiframe_" + id + "' class='iframecss' src='<%=contextPath%>/main/hello11.do'></iframe></div>" );
		tabs.tabs( "refresh" );
	    tabs.tabs('select' , "#tabdiv_"+id); 
	} else {
		tabs.tabs('select' , "#tabdiv_"+id); 
	}
}

/*
 * 
 var tabCounter = 1;
function clickMenu() {
	//$("#tabsHeader").append("<li class='ui-state-default ui-corner-top'><a href='#' class='ui-tabs-anchor' role='presentation'>erere</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>");
	
    var label = "Tab_" + tabCounter;
    var id = "tabs-" + tabCounter;
    var li = $( tabTemplate.replace( /@\{href\}/g, "#" + id ).replace( /@\{label\}/g, label ) )
    
    
    var tabContentHtml = "Tab_" + tabCounter + " content.";
    //var li = "<li><a href='#'>Yabbb</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>"
	tabs.find( ".ui-tabs-nav" ).append( li );
	tabs.append( "<div id='" + id + "' height='100%'><iframe id='iframe_" + id + "' class='iframecss'></iframe></div>" );
    tabs.tabs( "refresh" );

    alert($('#'+id).css('height'));
	tabCounter++;
	
	
}
*/



</script>

</body>

</html>
