<%@ page language="java" contentType="text/html;charset=gb2312" %>

<%
	String path = request.getContextPath();
	String hiddenPage = path + "/views/om/organ/dutyrole/OrganDisplayHidden.htm";
	String organDutyDisplayUri = path + "/om/OrganRoleDisplay.do";
	String allRoleListUri = path + "/om/allRoleListQuery.do";
	String actionBtnUri = path + "/views/om/organ/dutyrole/actionBtn.jsp";
	String blank = path+"/views/om/blank.html";
%>

<HTML><HEAD><TITLE>mainFrame</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2800.1226" name=GENERATOR>
</HEAD>
<frameset cols="0,50%,*" frameborder="NO" border="0" framespacing="0" id="treeFrame">
	<frame name="organdisplayhidden" src="<%=hiddenPage%>" scrolling="NO" noresize>
	<frame src="<%=organDutyDisplayUri%>" name="tree" scrolling="yes" noresize >
	<frameset rows="50%,40,50%" frameborder="NO" border="0" framespacing="0" id="mainFrame" scrolling="NO">
		<frame name="employeelist" src="<%=blank%>" scrolling="yes" noresize>
	 	<Frame src="<%=actionBtnUri%>" name="actionbtn" noresize scrolling="NO">
		<Frame src="<%=allRoleListUri%>" name="allemployee" noresize scrolling="yes">
	</frameset>
</frameset>

</frameset>

</HTML>