<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
%>
<%
String bottom = path+"/views/om/organ/passwordrenew/PasswordRenewBanner.jsp";
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
<frameset framespacing="1" frameborder="0" rows="15%,*" id = "mainFrameset">
    <frame name="banner" src="<%=bottom%>" scrolling ="no">
   	<frame name="bottom" src="<%=blank%>">
  	<noframes>
  	<body>
   		<p>����ҳʹ���˿�ܣ��������������֧�ֿ�ܡ�</p>
  	</body>
  	</noframes>
</frameset>
</html>