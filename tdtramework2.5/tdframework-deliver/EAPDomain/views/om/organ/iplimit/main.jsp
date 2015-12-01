<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String query = webpath+"/views/om/organ/iplimit/Query.jsp";
  String blank = webpath+"/om/ipLimitAction.do?method=query";
%>
<html>

	<head>
		<title>登录ip维护</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET rows="70,*,0" frameborder="NO" border="0" framespacing="0">
			<frame src="<%=query%>" name="query" scrolling="no" noresize="noresize" />
			<frame src="<%=blank%>" name="list"   scrolling="auto" noresize="noresize" />
	</FRAMESET> 
	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>	