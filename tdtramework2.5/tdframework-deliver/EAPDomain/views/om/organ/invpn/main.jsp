<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String query = webpath+"/views/om/organ/invpn/Query.jsp";
  String blank = webpath+"/views/om/blank.html";
%>
<html>

	<head>
		<title>受限网段维护</title>
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