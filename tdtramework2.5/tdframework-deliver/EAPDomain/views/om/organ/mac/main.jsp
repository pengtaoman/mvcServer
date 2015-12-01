<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  //String organTree = webpath+"/om/macsPermittedAction.do?method=showDealerTree";
  //String query = webpath+"/views/om/organ/mac/Query.jsp";
  String query = webpath+"/om/macsPermittedAction.do?method=queryInit";
  String blank = webpath+"/views/om/blank.html";
%>
<html>

	<head>
		<title>受限网段维护</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET rows="100,*,0" frameborder="NO" border="0" framespacing="0">
			<frame name="query" scrolling="no" src="<%=query%>" noresize>
			<frame name="list" src="<%=blank%>" scrolling="auto"  noresize="noresize">
	</FRAMESET>
  	<noframes>
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
  	</noframes>
	</frameset>
</html>	