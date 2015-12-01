<%@ page language="java" contentType="text/html;charset=gb2312" %>

<%
	String topUri = request.getContextPath() + "/om/organDutyDisplay.do";
	String employeeListUri = request.getContextPath() + "/blank.html";
	String buttonPageUri = request.getContextPath() + "/views/om/organ/employeeduty/actionBtn.jsp";
	String chooseEmployeeUri = request.getContextPath() + "/views/om/organ/employeeduty/EmployeeChoose.jsp";
	String hiddenPage = request.getContextPath() + "/views/om/organ/employeeduty/OrganDisplayHidden.jsp";
	String employeeListHidden = request.getContextPath() +"/views/om/organ/employeeduty/EmployeeListHidden.jsp";
%>

<HTML><HEAD><TITLE>mainFrame</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2800.1226" name=GENERATOR>
</HEAD>
<frameset cols="0,50%,*" frameborder="NO" border="0" framespacing="0" id="treeFrame">
  	<frame name="organdisplayhidden" src="<%=hiddenPage%>" scrolling="NO" noresize>
    <frame name="tree" src="<%=topUri%>" scrolling="yes" noresize >
  	<frameset rows="45%,45,*,0" frameborder="NO" border="0" framespacing="0" id="mainFrame">
	  <frame name="employeelist" src="<%=employeeListUri%>"  noresize>
		<frame name="actionbtn" src="<%=buttonPageUri%>" noresize >
		<frame name="actionlist" src="<%=chooseEmployeeUri%>" noresize >
		<frame name="employeeListHidden" src="<%=employeeListHidden%>" noresize >
	</frameset>
</frameset>
  
</frameset>

</HTML>