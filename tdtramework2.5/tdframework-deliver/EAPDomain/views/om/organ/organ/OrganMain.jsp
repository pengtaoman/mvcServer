<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
%>
<%
//String organDisplayLocation = path+"/om/OrganDisplayAction.do?OperType=init";
String treeTab = path + "/om/OrganDisplayAction.do?OperType=showTab";
//String treeTab = path+"/views/om/organ/organ/treeTab.jsp";
String blank = path+"/views/om/blank.html";
String organMainButtons = path+"/views/om/organ/organ/organbuttons.jsp";
String organMaintanceLocation = null;
String organDisplayHidden = path+"/views/om/organ/organ/OrganDisplayHidden.jsp";
if(organMaintanceLocation==null) organMaintanceLocation = blank;
String citySelect = path+"/om/OrganDisplayAction.do?OperType=getCityColl";
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset id="myFrame" framespacing="1" frameborder="0" cols="30%,*,0" >
	<frameset rows="30,*,0" framespacing="0" frameborder="no" border="0">
		<frame id="citySelect" name="citySelect" src="<%=citySelect%>" scrolling="no" noresize="noresize" />
		<frame id="organdisplay" name="organdisplay" src="<%=treeTab%>" scrolling="no" noresize="noresize" />
		<frame id="countryTree" name="countryTree" src="<%=blank%>" scrolling="auto" noresize="noresize" />
	</frameset>	
	<frameset framespacing="1" frameborder="0" rows="170,30,*" id="workPlace">
		<frame id="organmaintance" name="organmaintance" src="<%=blank%>" scrolling="no" noresize>
		<frame id="organmainbuttons" name="organmainbuttons" src="<%=organMainButtons%>" scrolling="NO" noresize>
		<frame id="dealermaintance" name="dealermaintance" src="<%=blank%>" scrolling="auto" noresize>	
	</frameset>
	<frame id="organdisplayhidden" name="organdisplayhidden" src="<%=organDisplayHidden%>">
</frameset>
  	<noframes>
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
  	</noframes>
</html>