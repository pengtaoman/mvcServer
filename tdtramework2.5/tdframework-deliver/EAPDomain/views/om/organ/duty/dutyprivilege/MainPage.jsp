<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath(); 
	String leftUri = path + "/om/dutyPrivilege.do?operType=dutyQuery";
	String blank = path+"/views/om/blank.html";
%>

<html>

<frameset framespacing="1" frameborder="0" cols="30%,*,0" >
	<frame name="left" src="<%=leftUri%>">
	<frame name="right" src="<%=blank%>">
	<frame name="hide" src="<%=blank%>">
  	<noframes>
  	<body>
   		<p>����ҳʹ���˿�ܣ��������������֧�ֿ�ܡ�</p>
  	</body>
  	</noframes>
</frameset>
</html>
