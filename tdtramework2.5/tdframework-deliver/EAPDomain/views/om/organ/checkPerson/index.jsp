<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
	String query=path+"/om/checkperson.do?method=init";
	String url = path+"/views/om/common_css_js/jsp/waittingPage.jsp";
	
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset id="myFrame" rows="110,*,0" frameborder="NO" border="0" framespacing="0">
  <frame name="query" scrolling="NO" noresize src="<%=query%>" />
  <frame name="list" scrolling="auto" noresize src="<%=url%>"/>  
</frameset>
</html>

