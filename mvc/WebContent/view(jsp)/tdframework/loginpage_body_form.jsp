<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%
    String contextPath = request.getContextPath();

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
	
	<tiles:insertAttribute name="captcha" />

	<div class="checkbox" align="right">
		<label> <input type="checkbox" value="remember-me">
			Remember me
		</label>
	</div>
	<input type="submit" class="btn btn-lg btn-primary btn-block"
		value="登录"></input>
</form>
</div>