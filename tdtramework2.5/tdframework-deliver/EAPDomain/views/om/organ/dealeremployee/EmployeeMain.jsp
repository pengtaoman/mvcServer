<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
%>
<%
String organDisplayLocation = path+"/om/OrganDisplayAction.do?OperType=showMarketTree";
String blank = path+"/views/om/blank.html";
String employeeListLocation = null;
String employeeMaintanceLocation = null;
String employeeButton = path + "/views/om/organ/dealeremployee/EmployeeButton.jsp";
String employeeMaintanceHidden = path+"/views/om/organ/dealeremployee/EmployeeMaintanceHidden.jsp";
String organDisplayHiddenLocation = path+"/views/om/organ/dealeremployee/OrganDisplayHidden.jsp";
String roleInfoAdjustHiddenLocation = path+"/views/om/organ/dealeremployee/RoleInfoAdjustHidden.jsp";
String treeDisplayLocation = blank;
if(employeeListLocation==null) employeeListLocation = blank;
if(employeeMaintanceLocation==null) employeeMaintanceLocation = blank;
if(employeeMaintanceHidden==null) employeeMaintanceHidden = blank;
if(organDisplayHiddenLocation==null) organDisplayHiddenLocation = blank;
if(roleInfoAdjustHiddenLocation==null) roleInfoAdjustHiddenLocation = blank;
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset framespacing="1" frameborder="0" cols="27%,*,0,0,0,0" id = "mainFrameset">
        <frameset framespacing="1" frameborder="0" rows="300,*" id ="treeFrameset">
			<frame name="organdisplay" target="employeelist" src="<%=organDisplayLocation%>">
			<frame name="dealerdisplay" target="employeelist" src="<%=treeDisplayLocation%>" scrolling="AUTO">
		</frameset>
		<frameset framespacing="1" frameborder="0" rows="156,*" id ="listFrameset">
			<frame name="employeebutton" target="employeelist" src="<%=employeeButton%>" noresize>
    		<frame name="employeelist" target="employeemaintance" src="<%=employeeListLocation%>" scrolling="AUTO" noresize>
    	</frameset>
    	<frame name="employeemaintance" src="<%=employeeMaintanceLocation%>">
  		<frame name="employeemaintancehidden" src="<%=employeeMaintanceHidden%>"  scrolling="NO" noresize>
  		<frame name="organdisplayhidden" src="<%=organDisplayHiddenLocation%>" scrolling="NO" noresize>
  		<frame name="roleInfoAdjustHidden" src="<%=roleInfoAdjustHiddenLocation%>" scrolling="NO" noresize>
  	<noframes>
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
  	</noframes>
</frameset>
</html>



















