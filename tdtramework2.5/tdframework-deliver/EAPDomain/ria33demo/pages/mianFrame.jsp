<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%
String apppath=EAPConfigHelper.getApplicationContextPath(request);
%>
<html>
<head>
<title>UniEAP RIA Demo应用</title>
</head>
<frameset rows="68,*" cols="*"  scrolling="no" frameBorder="0" frameSpacing="0" noresize="true" >
  <frame name="rootmenu" scrolling="NO" noresize src="<%=apppath%>/rootmenu.do" id="rootmenu"/>
  <frameset name="Child" rows="*" cols="200,*" frameborder="0" border="0" framespacing="0" id="Child">
    <frame name="childmenumain" frameBorder="0" noresize="true" scrolling="no" src="<%=apppath%>/childmenu.do" id="childmenu"/>
    <frame name="middern" frameBorder="0" noresize="true" scrolling="no" id="middern"  src="<%=apppath%>/viewpage.do" id="middern"/>
  </frameset>
<noframes>
  <body>
</noframes>
</frameset>

</html>