<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
	String query = path+"/views/om/organ/menu/Query.jsp";
	String blank = path+"/views/common/jsp/WaittingPage.jsp";
%>
<html>
<head>
<title></title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
</head>
<frameset id="mainFramset" rows="80,*,0" frameborder="NO" border="0" framespacing="0">
	<frame name="query" src="<%=query %>"  id="query"  scrolling="no" noresize>
	<frame name="list" src="<%=blank%>" id="list"  scrolling="auto" noresize>
</frameset>
<noframes>
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
</noframes>
</html>