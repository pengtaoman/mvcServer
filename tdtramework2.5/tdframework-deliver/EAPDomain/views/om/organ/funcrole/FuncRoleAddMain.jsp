<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
%>
<%
String funcroleAddLocation =path+"/om/FuncRoleAddAction.do?method=getInitInfo";
String funcRoleAddHidden= path+"/views/om/organ/funcrole/FuncRoleAddHidden.jsp";
String blank = path+"/views/om/blank.html";
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset framespacing="0" frameborder="0" rows="*,0" id = "mainFrameset">
    <frame name="funcroleadd" src="<%=funcroleAddLocation%>">
   	<frame name="funcroleaddrolehidden" src="<%=funcRoleAddHidden%>">
  	<noframes>
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
  	</noframes>
</frameset>
</html>