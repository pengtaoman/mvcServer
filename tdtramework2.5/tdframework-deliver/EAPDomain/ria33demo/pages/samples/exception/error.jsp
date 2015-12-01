<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
		<title>错误处理样例</title>
		<script type="text/javascript">
			dojo.addOnLoad(function(){
				var dc =<%=request.getAttribute("exceptionInfo")%>;
	            dojo.byId("errorCode").innerHTML = dc.header.code;				 
				dojo.byId("errorDetail").innerHTML = dc.header.message.detail;
			});
			
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" open=false  title="错误异常处理说明">
			当后台发生错误异常时， 将异常信息放到request的attribute里，在前台将异常信息拿到并展示。示例代码如下：<br>
			<pre >dojo.addOnLoad(function(){
			<br>	var dc =&lt%=request.getAttribute("exceptionInfo")%&gt;
	        <br>         dojo.byId("errorCode").innerHTML = dc.header.code;				 
			<br>	dojo.byId("errorDetail").innerHTML = dc.header.message.detail;
			<br>});
			</pre>
		</div>
		 <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="异常信息显示">
			  form提交错误异常码：<label id="errorCode"></label><br>
			  form提交错误异常详细信息:<br>
				<div dojoType="unieap.form.FieldSet" title="FieldSet控件">
					 <div id="errorDetail"></div>
				</div>
			<br>
		</div>
	</body>
</html>