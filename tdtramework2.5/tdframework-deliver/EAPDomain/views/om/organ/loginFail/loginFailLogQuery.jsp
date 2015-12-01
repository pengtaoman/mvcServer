
<%
	 /* JSP程序简要描述信息
	 **************************************************************
	 * 程序名		: loginFailLogQuery.jsp
	 * 建立日期	: 2010-08-14
	 * 作者		: jianglinhao
	 * 模块		: 登陆失败日志查询
	 * 描述		: 登陆失败日志查询主页面
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1   
	 * 2
	 **************************************************************
	 */
%>

<%@ page language="java" contentType="text/html;charset=gb2312"%>
<%
String path = request.getContextPath();
%>
<%
	String logLocation = path + "/views/om/organ/loginFail/loginFailLogQueryTop.jsp";
	String blank = path + "/views/om/blank.html";
%>
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="content-type" content="text/html; charset=gb2312">
		<title></title>
	</head>
	<frameset framespacing="1" frameborder="0" rows="20%,*"
		id="mainFrameset" noresize>
		<frame name="logquerybanner" scrolling="no" src="<%=logLocation%>"
			noresize>
		<frame name="logquerybottom" src="<%=blank%>" noresize="noresize">
	</frameset>
	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>