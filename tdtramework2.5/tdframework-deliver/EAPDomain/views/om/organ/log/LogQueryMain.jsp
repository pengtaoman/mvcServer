<%/* JSP程序简要描述信息
**************************************************************
* 程序名		: LogQueryMain.jsp
* 建立日期	: 2006-07-05
* 作者		: liuxue
* 模块		: 日志查询
* 描述		: 日志查询主页面
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1   
* 2
**************************************************************
*/
%>

<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
%>
<%
String logLocation =path+"/om/LogQueryAction.do?OperType=init";
String blank = path+"/views/om/blank.html";
String organDisplayLocation = path+"/views/om/organ/treeTab/treeTab.jsp";

%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset framespacing="1" frameborder="0" cols="30%,*" id = "mainFrameset" noresize>
		<frame name="treeTab" scrolling="no" src="<%=organDisplayLocation%>" noresize="noresize">
		<frameset framespacing="0" frameborder="0" rows="170,*" name= "rightFrameset" id = "rightFrameset" noresize>
			<frame name="logquerybanner" scrolling="no" src="<%=logLocation%>" noresize>
			<frame name="logquerybottom" src="<%=blank%>" noresize="noresize">
		<noframes>
  	<noframes>
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
  	</noframes>
</frameset>
</html>