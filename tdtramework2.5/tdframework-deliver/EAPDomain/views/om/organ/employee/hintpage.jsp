<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String message = (String)request.getAttribute("Message");
String titleMessage = "";
String bodyMessage = "";
if("one".equals(message))
{
	titleMessage = "功能角色赋权";
	bodyMessage = "您选择的是权限组内工号，不能进行功能赋权操作。"+"请与省份管理员联系。";
}
else if("two".equals(message))
{
	titleMessage = "参数角色赋权";
	bodyMessage = "您选择的是权限组内工号，不能进行数据赋权操作。"+"请与省份管理员联系。";
}
else if("three".equals(message))
{
	titleMessage = "功能权限信息";
	bodyMessage = "您选择的是权限组内工号，不能进行功能权限微调操作。"+"请与省份管理员联系。";
}
else if("four".equals(message))
{
	titleMessage = "数据权限信息";
	bodyMessage = "您选择的是权限组内工号，不能进行数据权限微调操作。"+"请与省份管理员联系。";
}
else if("five".equals(message))
{
	titleMessage = "取消微调页面";
	bodyMessage = "您选择的是权限组内工号，不能进行取消微调操作。"+"请与省份管理员联系。";
}
else{
	titleMessage = "error page";
	bodyMessage = "ERROR PAGE";
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <title><%=titleMessage %></title>
  </head>
  <body>
  	<p><font align = "center"><%=bodyMessage %></font></p>
  </body>
</html>
