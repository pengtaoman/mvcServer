<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
 
<%
	String webpath=request.getContextPath();
%>

<html>
<head>
	<title>TdFramework样例应用</title>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>

<frameset id="myFrame" rows="130,*,0" frameborder="NO" border="0" framespacing="0">
	<frame name="query" scrolling="NO" noresize src="<%=webpath%>/batchFileManager.do?method=init" />
	<frame name="list" scrolling="auto" noresize src=""/>
	<frame name="end" scrolling="auto" noresize src=""/>
</frameset>

<noframes>
<body bgcolor="#FFFFFF" text="#000000"></body>
</noframes>

</html>
