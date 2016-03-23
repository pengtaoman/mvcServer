<%
    String contextPath = request.getContextPath();
%>
	<nav class="navbar navbar-default navbar-fixed-top"  role="navigation">
		<div class="container" style="margin-left: 0">
			<div class="navbar-header">
			<!-- -->
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar" aria-expanded="false"
					aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			 
				<a class="navbar-brand" href="#">TDFramework3.0&nbsp;&nbsp;<span id="sidebarCtrl" class="glyphicon glyphicon-chevron-left sidebarCtrl" aria-hidden="true"></span></span></a>
				
			</div>
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li class="active"><a href="<%=contextPath%>/main">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#contact">Contact</a></li>
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-haspopup="true"
						aria-expanded="false">Dropdown <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="#">Action</a></li>
							<li><a href="#">Another action</a></li>
							<li><a href="#">Something else here</a></li>
							<li role="separator" class="divider"></li>
							<li class="dropdown-header">Nav header</li>
							<li><a href="#">Separated link</a></li>
							<li><a href="#">One more separated link</a></li>
						</ul></li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</nav>
	
<script>
$(document).ready(function(){
	$('#navbar').collapse({
	  toggle: false
	});
	
	$('#sidebarCtrl').on("click",function(){
		
		if ($('#sidebarCtrl').attr('class') == 'glyphicon glyphicon-chevron-left sidebarCtrl') {
			$('#sidebarDiv').css('transition-duration','.8s');
			//$('#sidebarDiv').css('position','relative');
			$('#sidebarDiv').css('margin-left','-1000px');//.attr('class','display: none;');
			
			$('#mainDiv').css('transition-duration','.8s');
			$('#mainDiv').attr('class','col-md-12  main');
			$('#sidebarCtrl').attr('class','glyphicon glyphicon-chevron-right sidebarCtrl');
	
		} else {
			$('#sidebarDiv').css('transition-duration','.8s');
			//$('#sidebarDiv').css('position','relative');
			$('#sidebarDiv').css('margin-left','0px');
			$('#sidebarDiv').attr('class','col-sm-3 col-md-2 sidebar');//.attr('class','display: none;');
			$('#mainDiv').attr('class','col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main');
			$('#sidebarCtrl').attr('class','glyphicon glyphicon-chevron-left sidebarCtrl');
		}
	});
});
</script>