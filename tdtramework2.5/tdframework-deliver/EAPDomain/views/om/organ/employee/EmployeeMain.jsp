<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
%>
<%
String organDisplayLocation = path + "/views/om/organ/employee/treeTab.jsp";
String blank = path+"/views/om/blank.html";
String employeeListLocation = null;
String employeeMaintanceLocation = null;
//String employeeButton = path + "/views/om/organ/employee/EmployeeButton.jsp";
String employeeButton = path + "/om/EmployeeQueryAction.do?OperType=initQueryPage";
String employeeMaintanceHidden = path+"/views/om/organ/employee/EmployeeMaintanceHidden.jsp";
String organDisplayHiddenLocation = path+"/views/om/organ/employee/OrganDisplayHidden.jsp";
String roleInfoAdjustHiddenLocation = path+"/views/om/organ/employee/RoleInfoAdjustHidden.jsp";
String treeDisplayLocation = blank;
String waittingPage = path+"/views/om/common_css_js/jsp/waittingPage.jsp";
if(employeeListLocation==null) employeeListLocation = blank;
if(employeeMaintanceLocation==null) employeeMaintanceLocation = blank;
if(employeeMaintanceHidden==null) employeeMaintanceHidden = blank;
if(organDisplayHiddenLocation==null) organDisplayHiddenLocation = blank;
if(roleInfoAdjustHiddenLocation==null) roleInfoAdjustHiddenLocation = blank;
String citySelect = path+"/om/EmployeeQueryAction.do?OperType=getCityColl";
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
<SCRIPT type="text/javascript" language="JavaScript">
<!--
	function resizeTheFrameSet(str)
	{
		document.getElementById('listFrameset').rows = str;
	}
-->
</SCRIPT>
</head>
<frameset framespacing="1" frameborder="no" cols="30%,*,0,0,0,0" id ="mainFrameset">
        <frameset framespacing="1" frameborder="no" rows="30,*,0" id ="treeFrameset">
        	<frame id="citySelect" name="citySelect" src="<%=citySelect%>" scrolling="no" noresize="noresize" />
			<frame name="organdisplay"  src="<%=organDisplayLocation%>" scrolling="NO" noresize>
			<frame name="dealerdisplay" src="<%=treeDisplayLocation%>" scrolling="AUTO" noresize>
		</frameset>
		<frameset framespacing="1" frameborder="no" rows="155,*" id ="listFrameset">
			<frame name="employeebutton" src="<%=employeeButton%>" scrolling="NO" noresize>
    		<frame name="employeelist"   src="<%=waittingPage%>" scrolling="AUTO" noresize>
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