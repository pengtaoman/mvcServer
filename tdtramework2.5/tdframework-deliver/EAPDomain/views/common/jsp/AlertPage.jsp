<%@ page import="com.neusoft.tdframework.web.controller.ControllerData" %>
<%@ page import="org.apache.struts.Globals" %>
<%@ page session="true"%>
<%@ page buffer="none" autoFlush="true" %>
<%@ page contentType="text/html; charset=GB2312" %>
<!--
  隐藏帧的报警信息页面
-->
<%
String webpath = request.getContextPath();
ControllerData controllerData = (ControllerData)request.getAttribute(ControllerData.REQUEST_NAME);
%>
<html>
<head>
<title>CRM</title>
</head>
<link href="<%=webpath%>/common/css/main_style.css" rel="stylesheet">
<body>
<%
	if(controllerData!=null) {
	    out.print("<script>");
	    out.print("alert(\"" + controllerData.getAlertMessage() + "\")");
	    out.print("</script>");
    }
%>
</body>
</html>
