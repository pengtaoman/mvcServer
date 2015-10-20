<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html lang="en" ng-app="td.login" id="tdlogin" class="ng-scope">

<head>

<%
    String contextPath = request.getContextPath();
    String captchaError = (String)request.getAttribute("captchaerror");
%>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>metisMenu</title>

<link rel="stylesheet" type="stylesheet" media="screen" href="<%=contextPath%>/resources/common/bootstrap.css">
<link rel="stylesheet" type="stylesheet" media="screen" href="<%=contextPath%>/resources/tdframework/signin.css">

<script src="<%=contextPath%>/resources/common/angular.min.js"></script>
<script src="<%=contextPath%>/resources/common/angular-animate.min.js"></script>
<script src="<%=contextPath%>/resources/common/angular-touch.min.js"></script>
<script src="<%=contextPath%>/resources/common/angular-sanitize.js"></script>

<script src="<%=contextPath%>/resources/common/ui-bootstrap-tpls-0.14.2.js"></script>
<script src="<%=contextPath%>/view/tdframework/login.js"></script>

</head>

<body class="ng-scope" ng-controller="mainCtrl">

<header class="navbar navbar-default navbar-fixed-top navbar-inner">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-3" ng-click="isCollapsed = !isCollapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand visible-xs" href="https://angular-ui.github.io/bootstrap/#">UI Bootstrap</a>
        </div>
        <nav class="hidden-xs">
            <ul class="nav navbar-nav">
                <a href="https://angular-ui.github.io/bootstrap/#top" role="button" class="navbar-brand">
                    UI Bootstrap
                </a>
                <li class="dropdown" uib-dropdown="">
                    <a role="button" class="dropdown-toggle" uib-dropdown-toggle="" aria-haspopup="true" aria-expanded="false">
                        Directives <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="https://angular-ui.github.io/bootstrap/#accordion">Accordion</a></li><li><a href="https://angular-ui.github.io/bootstrap/#alert">Alert</a></li><li><a href="https://angular-ui.github.io/bootstrap/#buttons">Buttons</a></li><li><a href="https://angular-ui.github.io/bootstrap/#carousel">Carousel</a></li><li><a href="https://angular-ui.github.io/bootstrap/#collapse">Collapse</a></li><li><a href="https://angular-ui.github.io/bootstrap/#datepicker">Datepicker</a></li><li><a href="https://angular-ui.github.io/bootstrap/#dropdown">Dropdown</a></li><li><a href="https://angular-ui.github.io/bootstrap/#modal">Modal</a></li><li><a href="https://angular-ui.github.io/bootstrap/#pagination">Pagination</a></li><li><a href="https://angular-ui.github.io/bootstrap/#popover">Popover</a></li><li><a href="https://angular-ui.github.io/bootstrap/#progressbar">Progressbar</a></li><li><a href="https://angular-ui.github.io/bootstrap/#rating">Rating</a></li><li><a href="https://angular-ui.github.io/bootstrap/#tabs">Tabs</a></li><li><a href="https://angular-ui.github.io/bootstrap/#timepicker">Timepicker</a></li><li><a href="https://angular-ui.github.io/bootstrap/#tooltip">Tooltip</a></li><li><a href="https://angular-ui.github.io/bootstrap/#typeahead">Typeahead</a></li>
                    </ul>
                </li>
                <li><a href="https://angular-ui.github.io/bootstrap/#getting_started">Getting started</a></li>
            </ul>
        </nav>
        <nav class="visible-xs collapse" uib-collapse="!isCollapsed" style="height: 0px;">
            <ul class="nav navbar-nav">
                <li><a href="https://angular-ui.github.io/bootstrap/#getting_started" ng-click="isCollapsed = !isCollapsed">Getting started</a></li>
                <li><a href="https://angular-ui.github.io/bootstrap/#directives_small" ng-click="isCollapsed = !isCollapsed">Directives</a></li>
            </ul>
        </nav>
    </div>
</header>
	<div class="navbar-wrapper">
		<div class="container-fluid">

			<div class="row">
				<div class="col-sm-9 col-md-9">
					<div id="myCarousel" class="carousel slide" data-ride="carousel">
						<!-- Indicators -->
						<ol class="carousel-indicators">
							<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
							<li data-target="#myCarousel" data-slide-to="1"></li>
							<li data-target="#myCarousel" data-slide-to="2"></li>
						</ol>
						<div class="carousel-inner" role="listbox">
							<div class="item active">

								<div class="container">
									<div class="carousel-caption">
										<h1>TDF3</h1>
										<p>简介</p>
										<p></p>
									</div>
								</div>
							</div>
							<div class="item">
								<div class="container">
									<div class="carousel-caption">
										<h1>Another example headline.</h1>
										<p>VVVVV</p>
									</div>
								</div>
							</div>
							<div class="item">
								<div class="container">
									<div class="carousel-caption">
										<h1>One more for good measure.</h1>
										<p>TTTT</p>
									</div>
								</div>
							</div>
						</div>
						<a class="left carousel-control" href="#myCarousel" role="button"
							data-slide="prev"> <span
							class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a> <a class="right carousel-control" href="#myCarousel"
							role="button" data-slide="next"> <span
							class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>
					</div>
				</div>
				<div id="loginForm" class="col-sm-3 col-sm-offset-9 col-md-3 col-md-offset-9"  ng-controller="loginCtrl">
					<form class="form-signin" name="login" id="login"
						action="<%=contextPath%>/main/login" method='POST'>
						<p class="form-signin-heading">
							请填写登录信息
							<%
							out.print(captchaError);
						%>
						</p>
						<div class="row">
							<div class="col-md-12 form-pading">
								<label for="inputEmail" class="sr-only">用户名</label> <input
									type="text" name="username" class="form-control"
									placeholder="用户名" required autofocus>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 form-pading">
								<label for="inputPassword" class="sr-only">密码</label> <input
									type="password" name="password" class="form-control"
									placeholder="密码" required>
							</div>
						</div>

						<div class="row">
							<div class="col-md-9 form-pading">
								<input type="text" name="jcaptcha" id="jcaptcha"
									class="form-control" placeholder="验证码" required />
							</div>
							<div class="col-md-3 form-pading">
								<img id="jcaptchaimg"
									src="<%=contextPath%>/resources/jcaptcha.jpg" />
							</div>
						</div>



						

						<div class="checkbox" align="right">
							<label> <input type="checkbox" value="remember-me">
								Remember me
							</label>
						</div>
						<input type="submit" class="btn btn-lg btn-primary btn-block"
							value="登录"></input>
					</form>
				</div>


			</div>

		</div>

		<tiles:insertAttribute name="footer" />
</body>
<script type="text/javascript">
/*
 $(document).ready(function() {
	 $("#jcaptchaimg").on( "click", 
			 function(){
		         $("#jcaptchaimg").attr("src","<%=contextPath%>/resources/jcaptcha.jpg");    
			 });	
 });	
 */
</script>
</html>