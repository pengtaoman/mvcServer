<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html ng-app="td.login">

<head>

<%
    String contextPath = request.getContextPath();
%>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>metisMenu</title>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">


<title>metisMenu</title>

<link href="<%=contextPath%>/resources/common/bootstrap/css/bootstrap.css" rel="stylesheet"  media="screen" >
<link href="<%=contextPath%>/resources/tdframework/signin.css" rel="stylesheet"  media="screen" >

<script src="<%=contextPath%>/resources/common/jquery/jquery-1.11.3.min.js"></script>
<script src="<%=contextPath%>/resources/common/fastclick.min.js"></script>
<script src="<%=contextPath%>/resources/common/angular/angular.min.js"></script>
<script src="<%=contextPath%>/resources/common/angular/angular-animate.min.js"></script>
<script src="<%=contextPath%>/resources/common/angular/angular-touch.min.js"></script>
<script src="<%=contextPath%>/resources/common/angular/angular-sanitize.js"></script>
<script src="<%=contextPath%>/resources/common/ui-bootstrap/ui-bootstrap-tpls-0.14.2.js"></script>

<script src="<%=contextPath%>/view/tdframework/login.js"></script>
</head>

<body>
	<div class="navbar-wrapper">
		<div class="container-fluid">
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
                <li class="dropdown" uib-dropdown>
                    <a role="button" id="dorw001" class="dropdown-toggle" uib-dropdown-toggle aria-haspopup="true" aria-expanded="false">
                        Directives <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Accordion</a></li>
                        <li><a href="#">Alert</a></li>
                        <li><a href="#">Buttons</a></li>
                        <li><a href="#">Carousel</a></li>
                    </ul>
                </li>
                <li><a href="#">Getting started</a></li>
            </ul>
            
		   <div class="btn-group" uib-dropdown>
				<button id="split-button" type="button" class="btn btn-danger">Action</button>
				<button type="button" class="btn btn-danger" uib-dropdown-toggle>
					<span class="caret"></span> <span class="sr-only">Split button!</span>
				</button>
				<ul class="uib-dropdown-menu" role="menu"
					aria-labelledby="split-button">
					<li role="menuitem"><a href="#">Action</a></li>
					<li role="menuitem"><a href="#">Another action</a></li>
					<li role="menuitem"><a href="#">Something else here</a></li>
					<li class="divider"></li>
					<li role="menuitem"><a href="#">Separated link</a></li>
				</ul>
		     </div>
        </nav>
        <nav class="visible-xs collapse" uib-collapse="!isCollapsed" style="height: 0px;">
            <ul class="nav navbar-nav">
                <li><a href="#" ng-click="isCollapsed = !isCollapsed">Getting started</a></li>
                <li><a href="#" ng-click="isCollapsed = !isCollapsed">Directives</a></li>
            </ul>
            

        </nav>
        

    </div>
</header>
		   <div class="row">
	<div class="col-sm-9 col-md-9">
		<div ng-controller="CarouselCtrl" class="carousel">
	<div style="height: 105px">
		<uib-carousel interval="myInterval" no-wrap="noWrapSlides">
		<uib-slide ng-repeat="slide in slides" active="slide.active">
		<img ng-src="{{slide.image}}" style="margin: auto;">
		<div class="carousel-caption">
			<h4>Slide {{$index}}</h4>
			<p>{{slide.text}}</p>
		</div>
		</uib-slide> </uib-carousel>
	</div>
	<div class="row">
		<div class="col-md-6">
			<button type="button" class="btn btn-info" ng-click="addSlide()">
				Add Slide
				</button>
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="noWrapSlides">
						Disable Slide Looping
					</label>
				</div>
		</div>
		<div class="col-md-6">
			Interval, in milliseconds: <input type="number" class="form-control"
				ng-model="myInterval"> <br />Enter a negative number or 0
			to stop the interval.
		</div>
	</div>
</div>
	</div>
	<div id="loginForm"
		class="col-sm-3 col-sm-offset-9 col-md-3 col-md-offset-9" >
		<%
    String captchaError = (String)request.getAttribute("captchaerror");
%>
<div style="position:relative;top:80px;" ng-controller="loginCtrl">
<form class="form-signin" name="login" id="login"
	action="<%=contextPath%>/main/login" method='POST'>
	<p class="form-signin-heading">请填写登录信息  {{username}}<%out.print(captchaError); %></p>
	<div class="row">
		<div class="col-md-12 form-pading">
			<label for="inputEmail" class="sr-only">用户名</label> 
			<input
				type="text" name="username" class="form-control" placeholder="用户名"
				ng-model="username"
				required autofocus>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12 form-pading">
			<label for="inputPassword" class="sr-only">密码</label> 
			<input
				type="password" name="password" class="form-control"
				ng-model="userpassword"
				placeholder="密码" required>
		</div>
	</div>
	
	<div class="row">
	<div class="col-md-9 form-pading">
		<input type="text" name="jcaptcha" id="jcaptcha" class="form-control"
			placeholder="验证码" required />
	</div>
	<div class="col-md-3 form-pading">
		<img id="jcaptchaimg" src="<%=contextPath%>/resources/jcaptcha.jpg" ng-click="refleshCaptcha('<%=contextPath%>')"/>
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
		</div>
</body>

</html>