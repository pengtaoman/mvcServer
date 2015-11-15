
<%
    String contextPath = request.getContextPath();
%>
<div class="row">
	<div class="col-md-9 form-pading">
		<input type="text" name="jcaptcha" id="jcaptcha" class="form-control"
			placeholder="验证码" required />
	</div>
	<div class="col-md-3 form-pading">
		<img id="jcaptchaimg" src="<%=contextPath%>/resources/jcaptcha.jpg" ng-click="refleshCaptcha('<%=contextPath%>')"/>
	</div>
</div>



<script type="text/javascript">
/*
		$(document).ready(function(){
			
			$("#jcaptchaimg").on("click",function(){
				$("#jcaptchaimg").attr("src","<%=contextPath%>/resources/jcaptcha.jpg");    
			});
			
			
		});
*/	
</script>