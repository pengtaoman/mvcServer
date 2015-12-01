<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		</script>
		
	</head>
<body class="unieap">
<div id="bc" dojoType="unieap.layout.BorderContainer">
	<div dojoType="unieap.layout.BorderPane" region="top" title="top" height="20%">
		top面板内容
	</div>
	<div dojoType="unieap.layout.BorderPane" region="bottom" title="bottom" height="30%">
		bottom面板内容
	</div>
	<div dojoType="unieap.layout.BorderPane" region="center" title="center">
		center面板内容,center面板必须有
	</div>
	<div dojoType="unieap.layout.BorderPane" region="left" title="left" width="20%">
		left面板内容
	</div>
	<div dojoType="unieap.layout.BorderPane" region="right" title="right" width="30%">
		right面板内容
	</div>
 </div>


</body>
</html>	
	